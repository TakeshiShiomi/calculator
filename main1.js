$(function() {

  let state = 0;
  $("button").click(function() {
    
    let pushed = $(this).text();
    //ブラウザ全体の中から#inputLabelID属性の要素を所得する宣言。
    let inputLabel = $('#inputLabel');

    //初期状態で+か-を押した後*と/を反応させない。
    if (inputLabel.text() === "+" || inputLabel.text() === "-") {
      if (pushed === "*" || pushed === "/") {
        return 
      }
    }

    if (pushed === "=") {
      // $.isNumeric()で指定した値が数値かどうかを判定。sliceメソッドを用いて最後の文字(-1)末尾が演算記号の時計算しない。
      if ($.isNumeric(inputLabel.text().slice(-1))) {
        inputLabel.text(eval(inputLabel.text()));
      } else {
        return
      }      
    } else if (pushed === "AC") {
      // クリアする。
      inputLabel.text("0");
      state = 0;

    } else {
      // 最初0の時÷を押せなくし、*の時は0*にする。
      if (inputLabel.text() === "0") {
        if ( pushed === "/") {
          pushed = "0";
        } else if (pushed === "*" ) {
          pushed = "0*";
        }
        // 演算記号がおされたらstate="calc"で管理。
        if (pushed === "+" || pushed === "-" || pushed === "*" || pushed === "/") {
          state = "calc"
          inputLabel.text(pushed);
        } else {
          inputLabel.text(pushed);
          state = 0;
        }
      
        // 演算記号を連続で押せなくする。
      } else {
        if(pushed === "+" || pushed === "-" || pushed === "*" || pushed === "/") {
          if (state === "calc") {
            let isCalc = inputLabel.text().slice(0, -1)
            inputLabel.text(isCalc + pushed);
          } else {
            state = "calc";
            inputLabel.text(inputLabel.text() + pushed);
          }
        } else {
          inputLabel.text(inputLabel.text() + pushed);
          state = 0;
        }
      }
    }
  });
});