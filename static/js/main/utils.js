function showAlert (message) {
  console.log(message);
}

var WaitingDialog;
WaitingDialog = WaitingDialog || (function () {
    return {
        showPleaseWait: function() {
            $('#pleaseWaitModal').modal('show');
        },
        hidePleaseWait: function () {
            $('#pleaseWaitModal').modal('hide');
        },

    };
})();