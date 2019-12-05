$(document).ready(function(){
  
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $('#choose').on('change', function(){
        $.ajax({
            dataType: 'json',
            url: url,
            success: function(data){
                var getData = $('#choose').val();
                var result = "";
                data.recipes.forEach(element => {
                    if(getData == element.id){
                    result +=`
                    <div class="row">
                        <div class="col-6">
                            <h1>${element.name}</h1>
                        </div>
                        <div class="col-6">
                            <img src="${element.iconUrl}" class="img-fluid" style="width: 200px; height: 150px;"/>
                        </div>
                    </div>
                    `;
                    }
                });
                $('#result').html(result);
            } 
        }); 
    });
});