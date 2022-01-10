import '@/css/test.css';
import img from './imgs/WechatIMG15.jpeg';

console.log('img: ', img);

console.log('Test MiniCssExtractPlugin');

document.querySelector('.css-loader-box').lastElementChild.src = img;