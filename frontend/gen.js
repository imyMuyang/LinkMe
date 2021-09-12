document.getElementById('step1-2').addEventListener('click', () => {
  const URLcheck = new RegExp(/(http|https):\/\/([\w.]+\/?)\S*/);
  if (!URLcheck.test($('#input-LongURL').val())) {
    $('#err-step1').css('display', 'block');
    $('#err-step1').text('该 URL 不正确。请以 http(s):// 开头。');
  } else {
    $('#step-tip').text('2 / 3 编辑详细信息');
    $('#step1-2,#step1-3,#err-step1').hide();
    $('#input-LongURL').attr('disabled', 'true');
    $('#success-step1').css('display', 'block');
  }
});
document.getElementById('step1-3').addEventListener('click', () => {
  const URLcheck = new RegExp(/(http|https):\/\/([\w.]+\/?)\S*/);
  if (!URLcheck.test($('#input-LongURL').val())) {
    $('#err-step1').css('display', 'block');
    $('#err-step1').text('该 URL 不正确。请以 http(s):// 开头。');
  } else {
    $('#step-tip').text('3 / 3 生成 URL');
    $('#step1-2,#step1-3,#err-step1').hide();
    $('#input-LongURL').attr('disabled', 'true');
    $('#err-step1').hide();
    $('#success-step1,#success-step2').css('display', 'block');
    axios.get('/api/easydwz?url=' + encodeURI($('#input-LongURL').val())).then(res => {
      if ((res.data.status = 'ok')) {
        $('#output-dwz').css('display', 'block');
        $('#output-dwz').text('短链接已生成：' + window.location.host + '/' + res.data.url);
      }
    });
  }
});
$('#type-302').on('click', () => {
  $('#tipmessage').hide();
  $('#tipmessagelabel').hide();
  $('#passwd').hide();
  $('#passwdlabel').hide();
});
$('#type-js').on('click', () => {
  $('#tipmessage').show();
  $('#tipmessagelabel').show();
  $('#passwd').show();
  $('#passwdlabel').show();
});
