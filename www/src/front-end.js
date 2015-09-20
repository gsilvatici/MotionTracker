/* jshint browser:true */
(function() {
    //wait for the DOM to be loaded
    document.addEventListener('DOMContentLoaded', function() {
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0xFFFFFF);

        // create a renderer instance
        var width = screen.availWidth;
        var height = screen.availHeight;
        var renderer = PIXI.autoDetectRenderer(width, height);

        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);

        requestAnimFrame(animate);

        // create a background Sprite using an image
        var background = PIXI.Sprite.fromImage("background.jpg");
        
        //  create the setting icon Sprite from an image
        //var settings = PIXI.Sprite.fromImage("settings-icon.png");
        
        
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("settings-icon.png");

        // create a new Sprite using the texture
        var settings = new PIXI.Sprite(texture);
        
        settings.setInteractive(true);
        
        
        background.width = width;
        background.height = height;
        
        stage.addChildAt(background, 0);
        
        
        settings.x = width*4/5 ;
        settings.y = height - height*17/18;
        
        settings.width = width*1/7
        settings.height = settings.width;
        

        stage.addChild(settings);
                
        
        var text = new PIXI.Text("STILL", {font: "35px Desyrel", align: "right", fill: "#bbbbbb"});

        text.x = width*3/8;
        text.y = height*2/5;
        
        stage.addChild(text);

        var lastFrame = (new Date()).getTime();
        
        // environmental variables
        var envVar = {
                transition: false,
                EPS: 0.00001,
                incr: -0.125,
                screen: "main"
        };

        var transition = false;

        var newText = text.text;
        
        var lastText = text.text;
        
        var pos = text.x;
        
        var EPS = 0.00001;
        
        var incr = -0.125;
        
        //alert(text.tint);
        
        function animate() {
            requestAnimFrame(animate);
            
            var actualFrame = (new Date()).getTime();
            
            var deltaT = actualFrame - lastFrame;
            
            //text.tint = 16777215 - (magnitude - 8)*100; 
            
            // if the text has to be changed (a transition), fade the transition
            if(transition) {

                if(text.alpha >= 0) {
                    text.alpha += incr;
                    if(Math.abs(text.alpha) < EPS) {
                        text.setText(newText);
                        text.x = pos;
                        incr = -incr;
                        lastText = newText;
                    }
                    if(text.alpha == 1) {
                        transition = false;
                        incr = -incr;
                    }
                }
            }
            // changes the text if it has passed certain amount of time
            else if(deltaT > 150 ) {
                
                if(magnitude > 0 && magnitude <= 10.5 && newText != "STILL") {
                    transition = true;
                    newText = "STILL";
                    pos = width*3/8;
                }
                else if(magnitude > 10.5 && magnitude <= 15 && newText != "CHANGING SPEED") {
                    transition = true;
                    newText = "CHANGING SPEED";
                    pos = width*1/7;
                }
                else if(magnitude > 15 && magnitude <= 45 && newText != "ACCELERATED") {
                    transition = true;
                    newText = "ACCELERATED";
                    pos = width*1/4;    
                }
                /*If there is a high accerations means that the velocity has changed
                //abruptly, as when it hits the ground*/
                else if(magnitude > 45 && newText != "CRASHED") {
                    transition = true;
                    newText = "CRASHED";
                    pos = width*1/3;  
                }
            lastFrame = actualFrame;
            }
            
            // render the stage
            renderer.render(stage);
        }        
        
        
        // callbacks for the touch events
        settings.touchstart = function(touchData) {
            settings.alpha = 0.5;
            
        }

        settings.touchend = function(touchData) {
            settings.alpha = 1;
            envVar.screen = "swiping";
        }
        
        settings.touchendoutside = function(touchData) {
            settings.alpha = 1;
        }
        
        
    }, false);

}());
