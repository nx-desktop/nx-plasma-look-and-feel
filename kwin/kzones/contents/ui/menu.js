

function test() {
    return "check";
}

function init() {
    KWin.registerUserActionsMenu(function(client){
        return {
            text: "Maximize to New Desktop",
            items: [
                {
                    text: "Enabled",
                    checkable: true,
                    checked: state.enabled,
                    triggered: function() {
                        state.enabled = !state.enabled;
                        if (state.enabled) {
                            
                        } else {
                            
                        }
                    }
                },
            ]
        };
    });
}