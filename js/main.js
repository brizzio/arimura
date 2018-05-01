var url = 'https://script.google.com/macros/s/AKfycbx-9yLxcaHm6HEPmE3P_FnzV4rkcNuDidJZZ1fPgDAq3yFlpO9e/exec'
var alunos

$(document).ready(function(){
    console.log('arimura pronto!!!')

        
    
    axios.get(url, {
            params: {
                query:'listaAtivos'
            }
        })
        .then((response)=>{
                console.log(response);
                alunos = response.data;
                console.log(alunos)
                if(!$('#searchText').val()) { 
                    $('#searchText').attr("placeholder", "Entre com o nome do aluno");
                }
        })
        .catch((err)=>{
            console.log(err);
        })


    $('#searchText').on('keyup', function(e){
        var html_div=''
        $("#produtos").html('');
        console.log(e.target.value);
        console.log('alunos: ' + alunos.length);
        var filtered = (function(pattern){
            var filtered = [], i = alunos.length, re = new RegExp('^.*'+ pattern + '.*$','i');
           

            console.log(re)
            while (i--) {
                if (re.test(alunos[i].nome)) {
                    filtered.push(alunos[i]);
                    var $div = $("<div>", {id: alunos[i].id, "class": "item-resultado"});
                    //<a id="LinkTest" title="Any Title"  href="#" onclick="Function(); return false; ">text</a>
 
                    $div.html( `	
                    <div class="col-md-3">
                        <div class = "well text-center">
                            
                             <h5><a class="alink" href="#" onclick="selecionaAluno(`+i+`); return false; ">` + alunos[i].nome + `</a></h5>
                            
                        </div>
                    </div>
                    `)
                    $("#produtos").append($div);  
                     
                }
            }
            //return filtered;
            //console.log('htmldiv: ' + html_div)
            //console.log(filtered)
            //$('#produtos').html(html_div);
           
        })(e.target.value); // A is the patt
    });

});

$('#searchForm').on('submit',function(e){
    let searchText = ($('#searchText').val());
    getProducts(searchText);
  
    e.preventDefault();
});


function selecionaAluno(aluno){
    document.getElementById("searchText").value = '';
    var obj = alunos[aluno]
    var $div = $("<div>", {id: obj.id, "class": "col-lg-12 selecao"});
    var $indiv = $("<div>", {"class": "well text-center"});
    $indiv.append( "<p><h4>" + obj.nome + "</h4></p><br>" );
    $indiv.append( "<p><h5>PLANO: " + obj.plano + "</h5></p><br>" );
    $indiv.append( `<p><span class="details">telefone: ` + obj.telefone + `</span></p><br>`);
    
    $div.append($indiv)
    $btn = $(`<button class="btn-primary" onclick="registraPresenca(`+aluno+`)">registra presença</button>`);
    $div.append('<br><br>')
    $div.append($btn)

    $('#produtos').html($div)
}

function registraPresenca(index) { 
    
    var obj = alunos[index]

        axios.get(url, {
            params: {
                query:'registraPresenca',
                objeto:JSON.stringify(obj)
            }
        })
        .then((response)=>{
                console.log(response);
                var $div = $("<div>", {"class": "col-md-4 col-md-offset-4 jumbotron"});
                $div.append( "<p><h3> " + response.data.result + "</h3></p>" );
                $div.append( "<p><h5>Registrado na linha: " + response.data.row + "</h5></p>" );
                $div.append( "<p><h5>ALUNO: " + response.data.dados[6] + "</h5></p>" );
                $('#produtos').html($div)
        })
        .catch((err)=>{
            alert('Houve um erro no registro da presença do aluno!!!');
            console.log(err);
        })



}

/* 
You can use jQuery.grep() since jQuery 1.0:
$.grep(homes, function (h) {
  return h.price <= 1000
    && h.sqft >= 500
    && h.num_of_beds >= 2
    && h.num_of_baths >= 2.5
});
json.HOMES = $.map(json.HOMES, function(val, key) {
    if (Number(val.price) <= 1000
            && Number(val.sqft) >= 500
            && Number(val.num_of_beds) >=2
            && Number(val.num_of_baths ) >= 2.5)
        return val;
});
 */