import avatar from  './avatar.jpg';
import './index.scss';


var img = new Image();
img.src =avatar;
img.classList.add('avatar');//avatar是class名称

var root = document.getElementById("root");
root.append(img);
