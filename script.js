let numberCriterion = 0;
let numberAlternative = 0;
let classNumberCriterions = document.getElementsByClassName(
  "number_criterions"
);
let rangeCriterions = document.getElementsByClassName("rangeCriterions");
let tableCriterions = document.getElementsByClassName("tableCriterions");
let rangeAlternatives = document.getElementsByClassName("rangeAlternatives");
let tableAlternatives = document.getElementsByClassName("tableAlternatives");
let result = document.getElementsByClassName("result");

rangeCriterions[0].style.display = "none";
tableCriterions[0].style.display = "none";
rangeAlternatives[0].style.display = "none";
tableAlternatives[0].style.display = "none";
result[0].style.display = "none";


let arrOfRangeCriterions;
$("body").on("click", "#continue", function () {
  numberCriterion = Number(document.getElementById("number_criterion").value);
  numberAlternative = Number(
    document.getElementById("number_alternative").value
  );
  if (!numberCriterion && !numberAlternative) {
    return false;
  }

  arrOfRangeCriterions = new Array(numberCriterion).fill(0);
  for (let i = 0; i < arrOfRangeCriterions.length; i++) {
    arrOfRangeCriterions[i] = new Array(numberCriterion).fill(0);
  }

  classNumberCriterions[0].style.display = "none";
  rangeCriterions[0].style.display = "inline";

  let criterionsHtml = "<p>Which is better:</p>";
  for (let i = 0; i < numberCriterion; i++) {
    for (let j = i; j < numberCriterion; j++) {
      if (i == j) {
        arrOfRangeCriterions[i][j] = 1;
        continue;
      }

      criterionsHtml +=
        "C" +
        (i + 1) +
        " | " +
        "C" +
        (j + 1) +
        '<input type="text" class="arrOfRangeCriterions"></input><br>';
    }
  }
  criterionsHtml += '<button id="saveRangeCriterions">Save</button>';
  rangeCriterions[0].innerHTML = criterionsHtml;
});

let arrOfRangeCriterionsValue;
let W;
let w;
$("body").on("click", "#saveRangeCriterions", function () {
  rangeCriterions[0].style.display = "none";
  tableCriterions[0].style.display = "inline";

  arrOfRangeCriterionsValue = document.getElementsByClassName(
    "arrOfRangeCriterions"
  );
  let tmp = 0;
  for (let i = 0; i < numberCriterion; i++) {
    for (let j = i + 1; j < numberCriterion; j++) {
      if (arrOfRangeCriterionsValue[tmp].value.length == 1) {
        arrOfRangeCriterions[i][j] = Number(
          arrOfRangeCriterionsValue[tmp].value
        );
        arrOfRangeCriterions[j][i] =
          1 / Number(arrOfRangeCriterionsValue[tmp].value);
      } else {
        arrOfRangeCriterions[i][j] =
          1 / arrOfRangeCriterionsValue[tmp].value.substr(2, 1);
        arrOfRangeCriterions[j][i] =
          arrOfRangeCriterionsValue[tmp].value.substr(2, 1) / 1;
      }
      tmp++;
    }
  }

  let htmlTableCriterion = "<th>Criterion</th>";
  for (let i = 0; i < numberCriterion; i++) {
    htmlTableCriterion += "<th>C" + (i + 1) + "</th>";
  }
  htmlTableCriterion += "<th>W</th><th>w</th>";

  W = new Array(numberCriterion);
  w = new Array(numberCriterion);
  let sumW = 0;
  for (let i = 0; i < numberCriterion; i++) {
    let p = 1;
    for (let j = 0; j < numberCriterion; ++j) p *= arrOfRangeCriterions[i][j];
    W[i] = Math.pow(p, 1 / numberCriterion);
    sumW += W[i];
  }
  for (let i = 0; i < numberCriterion; i++) w[i] = W[i] / sumW;
  for (let i = 0; i < numberCriterion; i++) {
    htmlTableCriterion += "<tr><td>C" + (i + 1) + "</td>";
    for (let j = 0; j < numberCriterion; j++) {
      htmlTableCriterion += "<td>" + arrOfRangeCriterions[i][j] + "</td>";
    }
    htmlTableCriterion += "<td>" + W[i] + "</td>" + "<td>" + w[i] + "</td>";
  }
  document.getElementById("tableCriterion").innerHTML = htmlTableCriterion;
});

let arrOfRangeAlternatives;
$("body").on("click", "#next", function () {
  tableCriterions[0].style.display = "none";
  rangeAlternatives[0].style.display = "inline";

  let alternativesHtml = "<p>Which is better:</p>";
  arrOfRangeAlternatives = new Array(numberCriterion);

  for (let i = 0; i < numberAlternative; i++) {
    arrOfRangeAlternatives[i] = new Array(numberAlternative);
    for (let j = 0; j < numberAlternative; j++) {
      arrOfRangeAlternatives[i][j] = new Array(numberAlternative);
    }
  }

  for (let i = 0; i < numberCriterion; i++) {
    alternativesHtml += "<br><br>According to C" + (i + 1) + ":<br>";
    for (let j = 0; j < numberAlternative; j++)
      for (let k = j + 1; k < numberAlternative; k++) {
        alternativesHtml +=
          "A" +
          (j + 1) +
          " | " +
          "A" +
          (k + 1) +
          '<input type="text" class="arrOfRangeAlternatives"></input><br>';
      }
  }
  alternativesHtml += '<button id="saveRangeAlternatives">Save</button>';
  rangeAlternatives[0].innerHTML = alternativesHtml;
});

let arrOfRangeAlternativesValue;
let V;
let nu;
$("body").on("click", "#saveRangeAlternatives", function () {
  rangeAlternatives[0].style.display = "none";
  tableAlternatives[0].style.display = "inline";

  arrOfRangeAlternativesValue = document.getElementsByClassName(
    "arrOfRangeAlternatives"
  );

  let tmp2 = 0;
  for (let i = 0; i < numberCriterion; i++) {
    for (let j = 0; j < numberAlternative; j++)
      for (let k = j; k < numberAlternative; k++) {
        if (j == k) {
          arrOfRangeAlternatives[i][j][k] = 1;
          continue;
        }
        if (arrOfRangeAlternativesValue[tmp2].value.length == 1) {
          arrOfRangeAlternatives[i][j][k] = Number(
            arrOfRangeAlternativesValue[tmp2].value
          );
          arrOfRangeAlternatives[i][k][j] =
            1 / Number(arrOfRangeAlternativesValue[tmp2].value);
        } else {
          arrOfRangeAlternatives[i][j][k] =
            1 / arrOfRangeAlternativesValue[tmp2].value.substr(2, 1);
          arrOfRangeAlternatives[i][k][j] =
            arrOfRangeAlternativesValue[tmp2].value.substr(2, 1) / 1;
        }
        tmp2++;
      }
  }

  nu = new Array(numberCriterion);
  V = new Array(numberCriterion);
  for (let i = 0; i < numberAlternative; i++) {
    nu[i] = new Array(numberAlternative);
    V[i] = new Array(numberAlternative);
  }

  for (let i = 0; i < numberCriterion; i++) {
    let sumV = 0;
    for (let j = 0; j < numberAlternative; j++) {
      let p = 1;
      for (let k = 0; k < numberCriterion; ++k)
        p *= arrOfRangeAlternatives[i][j][k];
      V[i][j] = Math.pow(p, 1 / numberAlternative);
      sumV += V[i][j];
    }
    for (let j = 0; j < numberCriterion; j++) nu[i][j] = V[i][j] / sumV;
  }

  let htmlTableAlternative = "<th>Alternatives</th>";
  for (let i = 0; i < numberCriterion; i++) {
    htmlTableAlternative += "<th>A" + (i + 1) + "</th>";
  }
  htmlTableAlternative += "<th>V</th><th>nu</th>";

  for (let i = 0; i < numberCriterion; i++) {
      htmlTableAlternative += '<tr><th>'+'According to C'+(i+1)+'</th></tr>'
    for (let j = 0; j < numberCriterion; j++) {
      htmlTableAlternative += "<tr><td>A" + (j + 1) + "</td>";
      for (let k = 0; k < numberCriterion; k++) {
        htmlTableAlternative +=
          "<td>" + arrOfRangeAlternatives[i][j][k] + "</td>";
      }
      htmlTableAlternative +=
        "<td>" + V[i][j] + "</td>" + "<td>" + nu[i][j] + "</td></tr>";
    }
  }
  document.getElementById("tableAlter").innerHTML = htmlTableAlternative;
});

$('body').on('click','#next2', function(){
    tableAlternatives[0].style.display = "none";
    result = document.getElementsByClassName("result")[0];
    result.style.display = "inline";

    let C = new Array(numberCriterion).fill(0);
	let max = 0;
    let max_pos;
    let htmlResult = "";

	for(let i = 0; i < numberCriterion; i++) {
        for(let j = 0; j < numberCriterion; j++)
        C[i] += w[j]*nu[j][i];
        htmlResult += 'C' + (i+1) + ' = ' + C[i] + '<br>';
        if (C[i] > max) 
        { 
            max = C[i]; 
            max_pos = i; 
        }
	}
    htmlResult += "<br>The best alternative is: A" + (max_pos+1);
    result.innerHTML = htmlResult;
})