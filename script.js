const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");

const urlInput = document.getElementById("urlInput");
const titleInput = document.getElementById("titleInput");

const cdArea = document.getElementById("cdArea");
const player = document.getElementById("player");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let songs = [];
let current = 0;

addBtn.onclick = () => {
  modal.style.display = "block";
};

function getYoutubeId(url) {

  const match = url.match(

    /(?:youtu\.be\/|youtube\.com.*v=)([a-zA-Z0-9_-]{11})/

  );

  return match ? match[1] : null;
}

saveBtn.onclick = () => {

  const title = titleInput.value;
  const url = urlInput.value;

  const id = getYoutubeId(url);

  if(!id){
    alert("유튜브 링크를 확인해주세요");
    return;
  }

  songs.push({
    title,
    id,
    thumb:
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  });

  current = songs.length - 1;

  render();

  modal.style.display = "none";

  titleInput.value = "";
  urlInput.value = "";
};

function render(){

  if(!songs.length){
    cdArea.innerHTML = "";
    player.src = "";
    return;
  }

  const song = songs[current];

  cdArea.innerHTML = `
    <div class="cd">
      <img src="${song.thumb}">
    </div>
  `;

  player.src =
  `https://www.youtube.com/embed/${song.id}`;
}

nextBtn.onclick = () => {

  if(!songs.length) return;

  current++;

  if(current >= songs.length){
    current = 0;
  }

  render();
};

prevBtn.onclick = () => {

  if(!songs.length) return;

  current--;

  if(current < 0){
    current = songs.length - 1;
  }

  render();
};

document.getElementById("clearBtn")
.onclick = () => {

  songs = [];
  current = 0;

  render();
};
