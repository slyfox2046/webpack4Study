import avatar from  './avatar.jpg';
// import './index.scss'; // 会影响createAvatar中的样式（全局）
import style from './index.scss'; // css模块化方式，与其它文件里的样式不会有耦合或冲突
import createAvatar from "./createAvatar";

createAvatar();

var img = new Image();
img.src =avatar;
// img.classList.add('avatar');//avatar是class名称
img.classList.add(style.avatar);//avatar是class名称

var root = document.getElementById("root");
root.append(img);

