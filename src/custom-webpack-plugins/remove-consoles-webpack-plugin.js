class RemoveConsoleWebpackPlugin {
  constructor(options) {
    let include = options && options.include;
    let removed = ['log']; // The default clear methods.

    if (include) {
      if (!Array.isArray(include)) {
        console.error('options.include must be an Array.');
      } else if (include.includes('*')) {
        // Clear all methods of console if pass a single '*'
        removed = Object.keys(console).filter(fn => {
          return typeof console[fn] === 'function';
        })
      } else {
        removed = include; // if include props param.
      }
    }

    this.removed = removed;
  }

  apply(compiler) {
    let assetsHandler = (assets, compilation) => {
      console.log('-----------------------assets: ----------------', assets);
      let removedStr = this.removed.reduce((a, b) => (a + '|' + b));

      let reDict = {
        1: [RegExp(`\\.console\\.(${removedStr})\\(\\)`, 'g'), ''],
        2: [RegExp(`\\.console\\.(${removedStr})\\(`, 'g'), ';('],
        3: [RegExp(`console\\.(${removedStr})\\(\\)`, 'g'), ''],
        4: [RegExp(`console\\.(${removedStr})\\(`, 'g'), '(']
      }

      Object.entries(assets).forEach(([filename, source]) => {
        console.log('-----------------------filename: ----------------', filename);
        if (/\.js$/.test(filename)) {
          // process previous files.
          let outputContent = source.source();

          Object.keys(reDict).forEach(i => {
            let [re, s] = reDict[i];
            outputContent = outputContent.replace(re, s);
          })

          compilation.assets[filename] = {
            // return the file content.
            source: () => outputContent,
            sourceAndMap: () => ({
              source: outputContent,
              map: source.map()
            }),
            // return the size of file.
            size: () => Buffer.byteLength(outputContent, 'utf8')
          }
        }
      })
    }

    /**
     * According to the compiler.hooks.compilation.tap listening event.
     * get the compilation object from the callback
     */
    compiler.hooks.compilation.tap('RemoveConsoleWebpackPlugin',
      compilation => {
        // webpack 5
        if (compilation.hooks.processAssets) {
          compilation.hooks.processAssets.tap({ name: 'RemoveConsoleWebpackPlugin' },
            assets => assetsHandler(assets, compilation)
          );
        } else if (compilation.hooks.optimizeAssets) {
          // webpack 4
          compilation.hooks.optimizeAssets.tap('RemoveConsoleWebpackPlugin', assets => assetsHandler(assets, compilation));
        }
      })
  }
}

// export Plugin
module.exports = RemoveConsoleWebpackPlugin;