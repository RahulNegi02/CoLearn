<div data-cmp="app-page" class="page">

    <div data-cmp="navigation" class="navigation">
        <div class="nav-container">
            <div class="nav-flex-wrapper">
                <div class="nav-item flex-item">
                    <button class="nav-button" id="fundamentals">
                        <span class="nav-icon">
                            <span class="icon icon-info"></span>
                        </span>
                        <span class="label" data-text="content.nav.fundamentals">Fundamentals</span>
                    </button>
                </div>
                <div class="nav-item flex-item">
                    <button class="nav-button" id="reset">
                        <span class="nav-icon">
                            <span class="icon icon-refresh"></span>
                        </span>
                        <span class="label" data-text="content.nav.reset">Reset</span>
                    </button>
                </div>
                <div class="nav-item flex-item">
                    <button class="nav-button" id="howto">
                        <span class="nav-icon">
                            <span class="icon icon-question-mark"></span>
                        </span>
                        <span class="label" data-text="content.nav.howto">Instructions</span>
                    </button>
                </div>
                <div class="nav-item flex-item">
                    <button class="nav-button" id="mute-sound">
                        <span class="nav-icon muted">
                            <span class="icon icon-sound-off"></span>
                        </span>
                        <span class="nav-icon unmuted">
                            <span class="icon icon-sound-on"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="logo-wrapper"></div>
        </div>
    </div>    

    <div data-cmp="start-layer" class="start-layer visible">
        <div class="start-container">
            <div class="main-wrapper grid-wrapper">
                <div class="headline-wrapper grid-item">
                    <h2 data-text="content.start.headline">The Potential of <br/>Wind Power</h2>
                </div>
                <div class="image-wrapper grid-item">
                    <img src="asset/images/pages/start/bg-start-page.png" alt="Wind Power | The Potential of Wind Power" title="Wind Power | The Potential of Wind Power" />
                </div>
                <div class="paragraph-wrapper grid-item">
                    <p data-text="content.start.paragraph1">A wind turbine converts the movement of air into electrical energy.</p>
                </div>
                <div class="button-loader-wrapper grid-item">
                    <button class="start-application">
                        <span data-text="content.start.button">TO SIMULATOR</span>
                    </button>
                    <div class="loader visible" data-cmp="loader">
                        <div class="loader-status-wrapper">
                            <div class="loader-status">
                                <div class="loader-bg">
                                    <div class="component mast"></div>
                                    <div class="component rotor"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="app-container">

        <div class="canvas-container" data-cmp="wind-power-configurator">
            <div class="user-interaction-container"></div>
        </div>
        
        <div class="bg-darkener"></div>

        <div data-cmp="simulation" class="simulation">
            <div class="layer-fade top"></div>
            <div class="button-close-wrapper">
                <button class="button-close">
                    <span class="icon icon-x"></span>
                </button>
            </div>
            <div class="simulation-wrapper">
                <div class="grid-wrapper">
                    <div class="grid-col">
                        <div class="grid-cell">
                            <div class="ui-button-wrapper">
                                <button id="start-simulation" class="ui-button">
                                    <span class="ui-icon icon-drop"></span>
                                    <span>START SIMULATION</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col">
                        <div class="grid-cell">
                            <div class="ui-item ui-message">
                                <div class="simulation-message">
                                    <div class="simulation-message-icon">
                                        <img class="info" src="asset/images/simulation/info-sign.png" alt="" title="">
                                        <img class="warning" src="asset/images/simulation/warning-sign.png" alt="" title="">
                                    </div>
                                    <div class="simulation-message-text">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col">
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="supplied-households">
                                <div class="ui-config">
                                    <span class="config-label">Supplied Households</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">______</span>
                                    <span class="result-unit">Households</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col">
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="generated-power">
                                <div class="ui-config">
                                    <span class="config-label">Power in Kilowatts</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">____</span>
                                    <span class="result-unit">kW</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layer-fade bottom"></div>
        </div>

        <div data-cmp="layer" class="layer">
            <div class="layer-animation-wrapper">
                <div class="layer-fade top">
                    <div class="button-close-wrapper">
                        <button class="button-close">
                            <span class="icon icon-x"></span>
                        </button>
                    </div>
                </div>
                
                <div class="layer-wrapper">
                    
                </div>
                <div class="layer-fade bottom"></div>
            </div>
        </div>

    </div>

</div>
