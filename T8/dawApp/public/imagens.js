function showImage(name,type){
    if(type =='image/png' || type=='image/jpeg')
            var ficheiro = '<img src="/fileStore/'+name+'"width="80%"/>'
    else
            var ficheiro = '<p>'+name+', '+type+'</p>'
    var fileObj = $(`
                    <div class="w3-row w3-margin">
                        <div class="w3-col s6">
                                ${ficheiro}
                        </div>
                        <div class="w3-col s6 w3-border">
                            <p>Filename: ${name}</p>
                            <p>Mimetype: ${type}</p>
                        </div>
                    </div>
                   `)
    
    var download = $('<div><a href="/files/download/'+name+'">Download</a></div>')
    $("#display").empty()
    $('#display').append(fileObj,download)
    $('#display').modal()
}

function addExtraForm() {
    var extraForm = $(`
         <div class="w3-row w3-margin-bottom">
                    <div class="w3-col s3">
                        <label class="w3-text-cyan">Description </label>
                    </div>
                    <div class="w3-col s9 w3-border">
                    <input class="w3-input w3-border w3-light-blue" type="text" name="desc">
                    </div>
                </div>
                <div class="w3-row w3-margin-bottom">
                    <div class="w3-col s3">
                        <label class="w3-text-cyan">Select File </label>
                    </div>
                    <div class="w3-col s9 w3-border">
                    <input class="w3-input w3-border w3-light-blue" type="file" name="myFile">
                    </div>
                </div>
    `)
    $("#extraForm").append(extraForm)


}