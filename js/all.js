const btn = document.querySelector('.btn');
const list = document.querySelector('.list');
const data = JSON.parse(localStorage.getItem("BMI")) || [];
toList(data);
// 將輸入的身高、體重，組成物件，並放置陣列內
function toArray(e) {
  let tallValue = document.querySelector('#tall').value;
  let weightValue = document.querySelector('#weight').value;
  let bmiValue = (weightValue * (Math.pow(100, 2)) / Math.pow(tallValue, 2)).toFixed(2);
  if (tallValue == 0 || weightValue == 0) {
    return;
  }
  //建立Date
  let dt = new Date();
  let dateStr = dt.getFullYear() + '.' + (dt.getMonth() + 1) + '.' + dt.getDate();
  let obj = {
    tall: parseFloat(tallValue).toFixed(1),
    weight: parseFloat(weightValue).toFixed(1),
    bmi: bmiValue,
    date: dateStr
  }
  //寫入結果圈圈
  let outcome = document.querySelector('.inner-circle p');
  outcome.innerHTML = bmiValue;
  let outerCircle = document.querySelector('.outer-circle');
  let smallCircle = document.querySelector('.small-circle');
  let valueP = document.querySelector('.inner-circle p');
  let bmiSpan = document.querySelector('.inner-circle span');
  if (bmiValue < 18.5) {
    outerCircle.style.backgroundColor = "rgb(0, 157, 255)";
    smallCircle.style.backgroundColor = 'rgb(0, 157, 255)';
    valueP.style.color = "rgb(0, 157, 255)";
    bmiSpan.innerHTML = "過輕";
    bmiSpan.style.color = "rgb(0, 157, 255)";
  } else if (18.5 <= bmiValue && bmiValue <= 23.9) {
    outerCircle.style.backgroundColor = "rgb(45, 159, 35)";
    smallCircle.style.backgroundColor = 'rgb(45, 159, 35)';
    valueP.style.color = "rgb(45, 159, 35)";
    bmiSpan.innerHTML = "正常"
    bmiSpan.style.color = "rgb(45, 159, 35)";
  } else if (24 <= bmiValue && bmiValue <= 27.9) {
    outerCircle.style.backgroundColor = "orange";
    smallCircle.style.backgroundColor = 'orange';
    valueP.style.color = "orange";
    bmiSpan.innerHTML = "超重";
    bmiSpan.style.color = "orange";
  } else if (28 <= bmiValue) {
    outerCircle.style.backgroundColor = "red";
    smallCircle.style.backgroundColor = 'red';
    valueP.style.color = "red";
    bmiSpan.innerHTML = "肥胖";
    bmiSpan.style.color = "red";
  }
  //將這筆資料寫入data陣列內，並上傳至localStorage。
  data.push(obj);
  toList(data);
  localStorage.setItem("BMI", JSON.stringify(data));
  //點擊後，消除原本的輸入
  document.querySelector('#tall').value = '';
  document.querySelector('#weight').value = '';
}
btn.addEventListener('click', toArray, false);
//寫入list上
function toList(Arr) {
  str = '';
  for (let j = 0; j < Arr.length; j++) {
    let bmiLevel, bmiColor;
    if (Arr[j].bmi < 18.5) {
      bmiLevel = "過輕";
      bmiColor = "rgb(0, 157, 255);"
    } else if (18.5 <= Arr[j].bmi && Arr[j].bmi <= 23.9) {
      bmiLevel = "正常";
      bmiColor = "rgb(45, 159, 35);"
    } else if (24 <= Arr[j].bmi && Arr[j].bmi <= 27.9) {
      bmiLevel = "超重";
      bmiColor = "orange"
    } else {
      bmiLevel = "肥胖";
      bmiColor = "red"
    }
    str += '<li style="border-left: 10px solid ' + bmiColor + '"><h3>' + bmiLevel + '</h3><div class="group"><span class="itemName">BMI</span><span class="itemValue">' + Arr[j].bmi + '</span></div><div class="group"><span class="itemName">Weight</span><span class="itemValue">' + Arr[j].weight + '</span><span>(公斤)</span></div><div class="group"><span class="itemName">height</span><span class="itemValue">' + Arr[j].tall + '</span><span>(公分)</span></div><div class="date"><span>' + data[j].date + '</span></div><button type="button" class="btnRemove" data-num="' + j + '">刪除</button></li>';
  }
  list.innerHTML = str;
}
//刪除紀錄
const btnRemoveAll = document.querySelector('.modalBtn');

function remove(e) {
  let dataNum = e.target.dataset.num;
  let dataNode = e.target.nodeName;
  console.log(dataNum);
  if (dataNode !== "BUTTON") {
    return;
  }
  data.splice(dataNum, 1);
  toList(data);
  localStorage.setItem("BMI", JSON.stringify(data));
}
list.addEventListener('click', remove, false);

function removeAll(e) {
  data = [];
  toList(data);
  localStorage.setItem("BMI", JSON.stringify(data));
}
btnRemoveAll.addEventListener('click', removeAll, false);
// remove Modal
$('#exampleModal').on('show.bs.modal', function(event) {
  let button = $(event.relatedTarget) // Button that triggered the modal
  let recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  let modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})
