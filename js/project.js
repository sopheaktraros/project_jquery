$('#hide').hide();//hide input calulate
$('#verical').hide();//hide verical line
$(document).ready(function(){ 
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $('#choose').on('change', function(){
        $('#hide').show();//show input calulate
        $('#verical').show();// show veircal line
        $('#Instructions').html('Instructions');//Instructions
        $('#Ingredients').html('Ingredients');//Ingredients
        $.ajax({
            dataType: 'json',
            url: url,
            success: function(data){
                var getData = $('#choose').val();
                var result = "";
                var output = "";
                data.recipes.forEach(element => {
                    if(getData == element.id){
                    result +=`
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-4">
                            <h1>${element.name}</h1>
                        </div>
                        <div class="col-3">
                            <img src="${element.iconUrl}" class="img-fluid" style="width: 200px; height: 150px;"/>
                        </div>
                        <div class="col-3"></div>
                    </div>
                    `;

                    element.ingredients.forEach(item =>{
                    output +=`
                      <tr>
                        <td><img src="${item.iconUrl}" width="30"></td>
                        <td>${item.quantity}</td>
                        <td>${(item.unit[0]).toLowerCase()}</td>
                        <td>${item.name}</td>
                      </tr>
                      `;
                    });//foreach 2 loop for ingredients
                    $('#output').html(output);

                    //Instructions 
                    

                    };//condition if esle
                });//foreach
                $('#result').html(result);

            } //success
        });//ajax
    });//function change
});//function ready

/////////////////////////////////////////////////////////
//calutate number
$('#up').on('click', function(){
    var getInput = $('#getInput').val();
    userUp(getInput); 
});

$('#donw').on('click', function(){
    var getInput = $('#getInput').val();
    userDonw(getInput); 
});

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

function getValueFromDB(){

}

function multiple(calculate){
    var muls = calculate * 2;
    output(muls);
}

function output(out){
    $('#result').html(out);
}