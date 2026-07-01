const game = document.getElementById("game");

/* ======================
   상태창 (FIXED)
====================== */
function popup(text) {
  let box = document.getElementById("popup");

  if (!box) {
    box = document.createElement("div");
    box.id = "popup";
    document.body.appendChild(box);
  }

  box.innerText = text;
  box.style.display = "block";

  const newBox = box.cloneNode(true);
  box.parentNode.replaceChild(newBox, box);

  let active = true;

  const close = () => {
    if (!active) return;
    active = false;

    newBox.style.display = "none";
    document.removeEventListener("click", close);
  };

  setTimeout(() => {
    document.addEventListener("click", close);
  }, 0);

  setTimeout(() => {
    close();
  }, 3000);
}

/* ======================
   씬 전환
====================== */
function setScene(fn) {
  game.innerHTML = "";
  fn();
}

/* ======================
   시작 화면
====================== */
function outside() {
  game.innerHTML = `
    <div style="text-align:center; padding-top:40vh;">
      <h2>현관문</h2>
      <input id="pw" maxlength="6">
      <button id="enter">ENTER</button>
    </div>
  `;

  document.getElementById("enter").onclick = () => {
    const v = document.getElementById("pw").value;
    if (v === "0911") setScene(room);
    else popup("비밀번호 오류");
  };
}

/* ======================
   방 + 이스터에그
====================== */
function room() {
  game.innerHTML = `
    <div class="room">
      <div id="sofa" class="obj"
        style="left:10%;bottom:10%;width:50%;height:30%;">소파</div>

      <div id="tablet" class="obj"
        style="left:40%;top:20%;width:20%;height:10%;">태블릿</div>

      <div id="clothes" class="obj"
        style="right:10%;top:40%;width:20%;height:15%;">옷가지</div>
    </div>
  `;

  let sofaCount = 0;
  let clothesCount = 0;

  document.getElementById("sofa").onclick = () => {
    sofaCount++;
    if (sofaCount >= 9) {
      popup("여기서 잘 생각?");
      sofaCount = 0;
    } else {
      popup("굳이 남의 소파에 누울 필요는 없을 것 같다···.");
    }
  };

  document.getElementById("clothes").onclick = () => {
    clothesCount++;
    if (clothesCount >= 9) {
      popup("남이 입던 옷인데.");
      clothesCount = 0;
    } else {
      popup("급하게 나간 흔적이 가득하다. 정리할 시간도 없었나?");
    }
  };

  document.getElementById("tablet").onclick = () => {
    tablet();
  };
}

/* ======================
   유다원 컷씬 (버그 수정 완료)
====================== */
function udawonCutscene() {
  game.innerHTML = "";
  document.body.style.background = "black";

  const box = document.createElement("div");

  box.style.position = "fixed";
  box.style.top = "50%";
  box.style.left = "50%";
  box.style.transform = "translate(-50%, -50%)";

  box.style.width = "90vw";
  box.style.height = "90vh";

  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.justifyContent = "center";
  box.style.textAlign = "center";

  box.style.color = "white";
  box.style.fontSize = "16px";
  box.style.lineHeight = "1.6";

  box.style.padding = "20px";
  box.style.boxSizing = "border-box";

  box.style.whiteSpace = "pre-wrap";
  box.style.overflow = "hidden";

  document.body.appendChild(box);

  const text1 =
    "예수께서 제자들과 함께 저녁을 잡수실 때 악마는 이미 가리옷 사람 시몬의 아들 유다의 마음속에 예수를 팔아넘길 생각을 불어 넣었다.";

  let i = 0;

  function type1() {
    if (i < text1.length) {
      box.innerHTML += text1[i++];
      setTimeout(type1, 45);
    } else {
      setTimeout(step2, 800);
    }
  }

  function step2() {
    box.innerHTML = "";

    const part1 =
      '날이 저물었을 때에 예수께서 열두 제자와 함께 식탁에 앉아 같이 음식을 나누시면서 "나는 분명히 말한다. 너희 가운데 한 사람이 나를 배반할 것이다." 하고 말씀하셨다. 이 말씀에 제자들은 몹시 걱정이 되어 저마다 "주님, 저는 아니겠지요?" 하고 물었다. 예수께 대답하셨다. "지금 나와 함께 그릇에 손을 넣은 사람이 바로 나를 배반할 것이다. 사람의 아들은 성경에 기록된 대로 죽음의 길로 가겠지만 사람의 아들을 배반한 그 사람은 화를 입을 것이다. 그는 차라리 세상에 태어나지 않았더라면 더 좋을 뻔했다."';

    const part2 =
      ' 그 때에 예수를 배반한 유다도 나서서 "선생님, 저는 아니지요?" 하고 묻자, 예수께서···.';

    let a = 0;
    let b = 0;

    const speedFast = 28;
    const speedSlow = 95;

    function typePart1() {
      if (a < part1.length) {
        box.innerHTML += part1[a++];
        setTimeout(typePart1, speedFast);
      } else {
        setTimeout(typePart2, 900);
      }
    }

    function typePart2() {
      if (b < part2.length) {
        box.innerHTML += part2[b++];
        setTimeout(typePart2, speedSlow);
      } else {
        setTimeout(step3, 900);
      }
    }

    typePart1();
  }

  /* 🔥 버그 수정된 핵심 구간 */
  function step3() {
    box.innerHTML = "";
    document.body.style.background = "black";

    setTimeout(() => {
      const text3 = '"그것은···."';
      let k = 0;

      function type3() {
        if (k < text3.length) {
          box.innerHTML += text3[k]; // ✔ 정상 문자 출력
          k++;
          setTimeout(type3, 140);
        } else {
          setTimeout(step4, 700);
        }
      }

      type3();
    }, 600);
  }

  function step4() {
    box.innerHTML = "";
    document.body.style.background = "black";

    setTimeout(() => {
      const phrase = "네 말이다. ";
      let k = 0;

      function spam() {
        if (k < 600) {
          box.innerHTML += phrase;
          k++;
          setTimeout(spam, 5);
        } else {
          setTimeout(step5, 800);
        }
      }

      spam();
    }, 400);
  }

  function step5() {
    box.innerHTML = "";
    document.body.style.background = "#2e3342";

    setTimeout(() => {
      box.remove();
      setScene(outside);
    }, 1000);
  }

  type1();
}

/* ======================
   태블릿
====================== */
function tablet() {
  game.innerHTML = `
    <div style="text-align:center; padding-top:30vh;">
      <h3>TABLET</h3>

      <input id="input">
      <button id="ok">확인</button>

      <button id="back">뒤로</button>
    </div>
  `;

  document.getElementById("ok").onclick = () => {
    const v = document.getElementById("input").value;

    if (v === "3033") {
      popup(
        "화면이 켜지자 나온 건 사진 하나. 외양이 비슷한 남성 둘이서 사이좋게 붙어있는 사진이다.\n\n" +
        "나이 차이가 좀 나네, 모르는 이가 본다면 형제와도 같아 보일지도."
      );
    }

    else if (v === "서도원") {
      popup("이 태블릿의 주인은 아끼는 사람을 그렇게까지 과시하고 싶어하지는 않는 것 같다···.");
    }

    else if (v === "도원일") {
      popup("제 4의 벽을 넘어버린 기분이다.");
    }

    else if (v === "구원일") {
      popup("난 내 이름을 그렇게 좋아하지는 않아.");
    }

    else if (v === "유다원") {
      udawonCutscene();
    }

    else {
      popup("아무 반응 없음");
    }
  };

  document.getElementById("back").onclick = () => setScene(room);
}

/* ======================
   시작
====================== */
window.onload = () => setScene(outside);