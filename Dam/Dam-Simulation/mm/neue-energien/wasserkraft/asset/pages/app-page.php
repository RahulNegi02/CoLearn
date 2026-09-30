<div data-cmp="app-page" class="page">

    <div data-cmp="navigation" class="navigation">
        <div class="nav-container">
            <div class="logo-wrapper">
            </div>
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
        </div>
    </div>    

    <div data-cmp="start-layer" class="start-layer visible">
        <div class="start-container">
            <div class="main-wrapper grid-wrapper">
                <div class="headline-wrapper grid-item">
                    <h2 data-text="content.start.headline">Hydroelectric Power – Electricity from Flow</h2>
                </div>
                <div class="image-wrapper grid-item">
                    <img src="asset/images/pages/start/bg-start-page.png" alt="Dam Simulation | Hydroelectric Power – Electricity from Flow" title="Dam Simulation | Hydroelectric Power – Electricity from Flow" />
                </div>
                <div class="paragraph-wrapper grid-item">
                    <p data-text="content.start.paragraph">A hydroelectric power plant converts the movement of water into electrical energy</p>
                </div>
                <div class="button-loader-wrapper grid-item">
                    <button class="start-application">
                        <span data-text="content.start.button">TO SIMULATOR</span>
                    </button>
                    <div class="loader visible" data-cmp="loader">
                        <div class="loader-status-wrapper">
                            <div class="loader-status">
                                <div class="loader-bg">
                                    <div class="wave back"></div>
                                    <div class="wave front"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="app-container">

        <div class="canvas-container" data-cmp="hydro-power-configurator">
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
                                    <span class="label">START <span class="label-sub">SIMULATION</span></span>
                                </button>
                            </div>
                        </div>
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="generated-power">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.power">Power in Megawatts</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty" data-decimal-places="3">___</span>
                                    <span class="result-unit">MW</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col">
                        <div class="grid-cell"></div>
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="household-consumption">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.consumption">Power supply of households</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty" data-decimal-places="0">______</span>
                                    <span class="result-unit">Households</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col diagram">
                        <div class="grid-cell">
                            <div class="legend">
                                <div class="desc">
                                    <span data-text="content.simulator.legend.headline">Power consumption by time of day</span>
                                </div>
                                <div class="definitions">
                                    <div class="peak-load"><span data-text="content.simulator.legend.peak">Peak load</span></div>
                                    <div class="medium-load"><span data-text="content.simulator.legend.medium">Medium load</span></div>
                                    <div class="base-load"><span data-text="content.simulator.legend.base">Base load</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="grid-cell-background">
                            <div class="indicator-lines">
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                            </div>
                            <div class="user-interaction-container">
                                <div class="seeker-bar">
                                    <div class="handle">
                                        <div class="arrows"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid-cell-timeline">
                            <div class="timeline-item"><span>0:00</span></div>
                            <div class="timeline-item"><span>3:00</span></div>
                            <div class="timeline-item"><span>6:00</span></div>
                            <div class="timeline-item"><span>9:00</span></div>
                            <div class="timeline-item"><span>12:00</span></div>
                            <div class="timeline-item"><span>15:00</span></div>
                            <div class="timeline-item"><span>18:00</span></div>
                            <div class="timeline-item"><span>21:00</span></div>
                            <div class="timeline-item"><span>0:00</span></div>
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