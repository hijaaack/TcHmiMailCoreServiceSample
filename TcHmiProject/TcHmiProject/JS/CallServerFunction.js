// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.758.8/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject;
        (function (TcHmiProject) {
            function CallServerFunction(FunctionName, Parameter) {

                let request = {
                    'requestType': 'ReadWrite',
                    'commands': [{
                        'symbol': FunctionName,
                        'commandOptions': ['SendErrorMessage']
                    }]
                };

                //Set request write object
                request.commands[0].writeValue = Parameter;

                //Check if the websocket to the server is ready
                if (TcHmi.Server.isWebsocketReady()) {
                    //Send request to the TwinCAT HMI Server
                    TcHmi.Server.request(request, function (data) {

                        //Check callback data for errors
                        if (data.error !== TcHmi.Errors.NONE) {
                            //Handle Server error here
                            TcHmi.Log.error(TcHmi.Log.buildMessage(data.error), false);
                            return;
                        }

                        //Check response for errors
                        if (data.response.error !== undefined) {
                            //Handle HMI server repsonse error here
                            TcHmi.Log.warn(TcHmi.log.buildMessage(data.response.error), false);
                            return;
                        }

                        //If no commands are defined in the response return
                        if (!data.response.commands || !Array.isArray(data.response.commands)) return;

                        //Check all commands in the response for errors
                        for (var i = 0; i < data.response.commands.length; i++) {
                            //console.log(data);
                            let errorObject = data.response.commands[i].error;
                            if (errorObject) {
                                //Handle HMI Server command level error here                             
                            }
                        }

                    });
                }

            }
            TcHmiProject.CallServerFunction = CallServerFunction;
        })(TcHmiProject = Functions.TcHmiProject || (Functions.TcHmiProject = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('CallServerFunction', 'TcHmi.Functions.TcHmiProject', TcHmi.Functions.TcHmiProject.CallServerFunction);
