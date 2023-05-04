import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

const updateTime = () => {
  player.getCurrentTime().then(function (time) {
    localStorage.setItem('videoplayer-current-time', time);
  });
};

player.on('timeupdate', throttle(updateTime, 1000));

if (!localStorage.getItem('videoplayer-current-time')) {
  localStorage.setItem('videoplayer-current-time', 0);
  player.setCurrentTime(0);
} else {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
