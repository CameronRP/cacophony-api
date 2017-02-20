window.onload = function(){
  console.log(id);

  headers = { where: '{"id": '+id+'}' };
  var jwt = sessionStorage.getItem('token');
  if (jwt) {
    headers.Authorization = jwt;
  }
  $.ajax({
    url: "/api/v1/audiorecordings",
    type: 'get',
    headers: headers,
    success: requestSuccess,
    error: requestError
  });
};

var recording = null;

function requestError(err) {
  console.log(err);
  window.alert(err);
}

function requestSuccess(res) {
  console.log(res);
  recording = res.result.rows[0];
  console.log(recording);
  if (recording.fileUrl) {
    var player = document.getElementById('player');
    var source = document.createElement('source');
    source.src = recording.fileUrl;
    player.appendChild(source);
  }

  document.getElementById('time-text').innerHTML = getStartTimeText();
  document.getElementById('date-text').innerHTML = getRecordingDateText();
  document.getElementById('location-text').innerHTML = getLocationText();
  document.getElementById('tags-text').value = getTagsText();
}

function getRecordingDateText() {
  return recording.recordingDateTime;
}

function getStartTimeText() {
  return recording.recordingTime;
}

function getLocationText(){
  return recording.location;
}

function getTagsText() {
  if (recording.tags) {
    return JSON.stringify(recording.tags);
  } else {
    return "No tags for recording.";
  }
}
