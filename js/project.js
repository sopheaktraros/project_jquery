$('#inputCalulate').hide();//hide input calulate
$('#verical').hide();//hide verical line

//get url from api
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
} 

//globle veriable store array for other using
var allData = [];
$(document).ready(function () {
   requestApi();//function request name of element from api
$('#select').on('change', function(){
    $('#inputCalulate').show();//show input calulate
    $('#verical').show();//show verical line
    var getValueSelect = $('#select').val();//get value from select option
    getRecipes(getValueSelect);
   })

//calulate number if click on sign +
    $('#up').on('click', function(){
        var getInputUp = $('#getInput').val();//get value from input
        userUp(getInputUp); 
    });

//calulate number if click on sign -
    $('#donw').on('click', function(){
        var getInputDonw = $('#getInput').val();//get value from input
        userDonw(getInputDonw); 
    });
});

//request api
function requestApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log('error'),
    })
}

//loop api to get name and id of element and throw to html in select tage
function chooseRecipe(recipe){
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option +=`
            <option value="${element.id}">${element.name}</option>
        `;
    });
    $('#select').append(option);
}

//loop array and condition (if value select's of element eques id of data get from api it is will call eachRecipes, eachIngredients, eachStep function)
function getRecipes(id) {
    allData.forEach( item =>{
        if(item.id == id){
            eachRecipes(item.name, item.iconUrl, item.nbGuests);
            eachIngredients(item.ingredients);
            eachStep(item.instructions);
        }
    })
}

//loop display name and image of recipes on the screen and display guests into type input 
function eachRecipes(name, img , guests){
    var result = "";
    var getGuests = "";
    result +=`
    <div class="row">
        <div class="col-2"></div>
        <div class="col-4">
            <h1>${name}</h1>
        </div>
        <div class="col-3">
            <img src="${img}" class="img-fluid" style="width: 200px; height: 150px;"/>
        </div>
        <div class="col-3"></div>
    </div>
    `;
    getGuests +=`
        <input type="text" value="${guests}" class="form-control text-center" disabled >
    `;
    $('#nbGuests').html(getGuests);
    $('#result').html(result);
}

//loop array in array to get iconUrl, quantity, unit, name of ingredients and display result of ingredients on the screen
function eachIngredients(ingredients){
    $('#ingredients').html("Ingredients");
    var result ="";
    ingredients.forEach(element =>{
        var {iconUrl, quantity, unit, name} = element;
        result +=`
    <tr>
        <td><img src="${iconUrl}" width="30"></td>
        <td>${quantity}</td>
        <td>${(unit[0]).toLowerCase()}</td>
        <td>${name}</td>
    </tr>
    `;

    })
    $('#output').html(result);
}

//loop instructions and cut step in api
function eachStep(instructions){
    $('#instructions').html("Instructions");
    var result = "";
    var splitStep = instructions.split("<step>");
    for(var i = 1; i < splitStep.length; i++){
        result +=`
        <h6 class="text-primary">Step: ${i}</h6>
        <p>${splitStep[i]}</p>
    `;
    }
    $('#instruct').html(result);
}

//calulate the number
function userUp(up){
    var getVarlueUp = parseInt(up) + 1;
    if(getVarlueUp <= 15){
        $('#getInput').val(getVarlueUp);
        multiple(getVarlueUp);
       
    }
}

function userDonw(donw){
    var getVarlueDonw = parseInt(donw) - 1;
    if(getVarlueDonw >= 0){
        $('#getInput').val(getVarlueDonw);
        multiple(getVarlueDonw);
        
    }
}

function multiple(calculate){
    var muls = calculate * 5;
    output(muls);
}

function output(out){
    $('#result').html(out);
}