$('#inputCalulate').hide();//hide input calulate
$('#verical').hide();//hide verical line
function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

var allData = [];
$(document).ready(function () {
   requerstApi();
$('#select').on('change', function(){
    $('#inputCalulate').show();//show input calulate
    $('#verical').show();//show verical line
    var getValueSelect = $('#select').val();
    getRecipes(getValueSelect);
   })
});

function requerstApi(){
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log('error'),
    })
}
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
function getRecipes(id) {
    allData.forEach( item =>{
        if(item.id == id){
            eachRecipes(item.name, item.iconUrl);
            eachIngredients(item.ingredients);
            eachStep(item.instructions);
        }
    })
}

function eachRecipes(name, img){
    var result = "";
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
    $('#result').html(result);
}

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

function eachStep(instructions){
    $('#instructions').html("Instructions");
    var result = "";
    result +=`
        <tr>
            <td>${instructions}</td>
        </tr>
    `;
    $('#instruct').html(result);
}