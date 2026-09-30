<div data-cmp="app-page" class="page">

    <div data-cmp="navigation" class="navigation">
        <div class="nav-container">
            <div class="nav-flex-wrapper">
                <div class="nav-item flex-item">
                    <button class="nav-button" id="fundamentals">
                        <span class="nav-icon">
                            <span class="icon icon-info"></span>
                        </span>
                        <span class="label" data-text="content.nav.fundamentals">Basics</span>
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
                    <h2 data-text="content.start.headline">Solar Thermal - Heating with the Sun</h2>
                </div>
                <div class="image-wrapper grid-item">
                    <img src="asset/images/pages/start/bg-start-page.png" alt="Solar Panel | Solar Thermal - Heating with the Sun" title="Solar Panel | Solar Thermal - Heating with the Sun" />
                </div>
                <div class="paragraph-wrapper grid-item">
                    <p data-text="content.start.paragraph1">In a solar thermal system, sunlight heats water — for heating and as hot water</p>
                </div>
                <div class="button-loader-wrapper grid-item">
                    <button class="start-application">
                        <span data-text="content.start.button">TO THE SIMULATOR</span>
                    </button>
                    <div class="loader visible" data-cmp="loader">
                        <div class="loader-status-wrapper">
                            <div class="loader-status">
                                <div class="loader-bg">
                                    <div class="sun back"><div class="rotation-wrapper"></div></div>
                                    <div class="sun front"><div class="rotation-wrapper"></div></div>
                                    <div class="sun-cover"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="app-container">

        <div class="canvas-container" data-cmp="solar-thermal-configurator">
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
                                    <span data-text="content.simulator.button">START SIMULATION</span>
                                </button>
                            </div>
                        </div>
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="daily-consumption">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.daily">Daily Hot Water Requirement</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">____</span>
                                    <span class="result-unit">Persons</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col">
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="energy-gain">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.energy">System Energy Yield</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">______</span>
                                    <span class="result-unit">kWh/day</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="amount-heated-water">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.water">Amount of Water Heated to 45°</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">____</span>
                                    <span class="result-unit">Litres/day</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col">
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="shower-time">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.shower">Shower Time</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">______</span>
                                    <span class="result-unit">min/day</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                        <div class="grid-cell">
                            <div class="ui-item" data-config-data-type="filled-bathtubs">
                                <div class="ui-config">
                                    <span class="config-label" data-text="content.simulator.bathtub">Bathtubs Filled</span>
                                </div>
                                <div class="ui-animated-bar">
                                    <div class="bar-background"></div>
                                    <div class="bar-fill"></div>
                                </div>
                                <div class="ui-result">
                                    <span class="result-value is-empty">____</span>
                                    <span class="result-unit">Units/day</span>
                                </div>
                                <div class="ui-divider"></div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-col ui-list">
                        <div class="grid-cell ui-list-item" data-config-type="location-config">
                            <span class="label" data-text="content.simulator.location">Location:</span>
                            <span class="data">__________</span>
                        </div>
                        <div class="grid-cell ui-list-item" data-config-type="latitude-config">
                            <span class="label" data-text="content.simulator.latitude">Latitude:</span>
                            <span class="data">__________</span>
                        </div>
                        <div class="grid-cell ui-list-item" data-config-type="season-config">
                            <span class="label" data-text="content.simulator.season">Season:</span>
                            <span class="data">__________</span>
                        </div>
                        <div class="grid-cell ui-list-item" data-config-type="weather-config">
                            <span class="label" data-text="content.simulator.weather">Weather:</span>
                            <span class="data">__________</span>
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