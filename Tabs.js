    const Tabs = Backbone.Model.extend({
        defaults: {
            selectedTab:1,
        }
    });
    const NEWSTAB = 1, ENTERTAINMENTTAB = 2, SPORTSTAB = 3, CULTURETAB = 4;


    let tabModelInstance = new Tabs({});
    $(document).ready(function () {
        const ContainerView = Backbone.View.extend({
            initialize: function () {
                this.listenTo(this.model, 'change', this.render)
            },
            render: function () {
                 let mainTextGoesHere = `
                            <div class="buttonContainer">
                            <button id="nyheter-id" class="btn btn-primary" >Nyheter</button>
                            <button id="sport-id" class="btn btn-primary">Sport</button>
                            <button id="noje-id" class="btn btn-primary">Nöje</button>
                            <button id="kultur-id" class="btn btn-primary">Kultur</button>
                            <br><br></div>`;

                this.$el.html(mainTextGoesHere);

                let contentViewInstance = new ContentView({model: tabModelInstance});

                this.$el.append(contentViewInstance.$el);
                contentViewInstance.render();
            },
            events: {
                "click #nyheter-id": 'showTabNyheter',
                "click .gotToNyheter": 'showTabNyheter',
                "click .goToNoje": 'showTabNoje',
                "click #sport-id": 'showTabSport',
                "click .goToSport": 'showTabSport',
                "click .goToKultur": 'showTabKultur',
                "click .goToKultur2": 'showTabKultur',
                "click .goToSport2": 'showTabSport',
                "click .gotToNyheter3": 'showTabNyheter',
                "click .goToNoje2": 'showTabNoje',
                "click #noje-id": 'showTabNoje',
                "click #kultur-id": 'showTabKultur',
                // "click #goFromSportToNoje":"showTabNoje",
                // "click #goFromNojeToKultur": ""
            },
            showTabNyheter: function () {

                this.model.set({selectedTab: NEWSTAB});
                let news_btn = document.getElementById('nyheter-id');
                news_btn.style.backgroundColor = '#246919';

            },
            showTabSport: function () {
                this.model.set({selectedTab: SPORTSTAB});
                let sports_btn = document.getElementById('sport-id');
                sports_btn.style.backgroundColor = '#246919';
            },
            showTabNoje: function () {
                this.model.set({selectedTab: ENTERTAINMENTTAB});
                let entertainment_btn = document.getElementById('noje-id');
                entertainment_btn.style.backgroundColor = '#246919';
            },
            showTabKultur: function () {
                this.model.set({selectedTab: CULTURETAB});
                let culture_btn = document.getElementById('kultur-id');
                culture_btn.style.backgroundColor = '#246919';
            }
        });
        let tabView = new ContainerView({
            model: tabModelInstance,
            el: '#output-div-id'
        });
        const ContentView = Backbone.View.extend({
            initialize: function () {
                this.listenTo(this.model, 'click', this.render)
            },
            render: function () {
                let viewInstance;
                let modelStatus = tabModelInstance.get('selectedTab');

                if (modelStatus === NEWSTAB) {
                    viewInstance = new Nyheter({});
                    viewInstance.render();
                } else if (modelStatus === ENTERTAINMENTTAB) {
                    viewInstance = new Noje({});
                    viewInstance.render();
                } else if (modelStatus === SPORTSTAB) {
                    viewInstance = new SportV({});
                    viewInstance.render();
                } else if (modelStatus === CULTURETAB) {
                    viewInstance = new KulturV({});
                    viewInstance.render();
                } else {
                    console.log('felaktig model status')
                }
                this.$el.html(viewInstance.$el);
            }
        });
        const SportV = Backbone.View.extend({
            render: function () {
                let sportsHTML = '<div class="jumbotron">\n' +
                    ' <button type="button" class="btn btn-primary gotToNyheter">&#10094</button>\n' +
                    '<button type="button" class="btn btn-primary goToNoje"> &#10095</button> ' +
                    '<h1 class="display-3">I\'m in Man Utd ad for next season</h1>\n' +
                    '  <p class="lead">Ole Gunnar Solskjaer has joked it will be "strange" if he does not get the Man Utd job ' +
                    'after being involved in a promotional video for next season. </p>\n' +
                    '  <hr class="my-4">\n' +
                    '  <p class="lead">\n' +
                    '    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\n' +
                    '  </p>\n' +
                    '</div> ';
                this.$el.html(sportsHTML);
            }
        });
        const KulturV = Backbone.View.extend({
            render: function () {
                let kulturHtml = '<div class="jumbotron"><button type="button" class="btn btn-primary goToNoje2">&#10094</button>\n' +
                    '    <button type="button" class="btn btn-primary gotToNyheter3"> &#10095</button>\n\n' +
                    '  <h1 class="display-3">Toilet paper destroying Canadian forests</h1>\n' +
                    '  <p class="lead">The boreal forest covers almost 60% of Canada and is home to 600 indigenous communities. Its huge size means it ' +
                    'can absorb large amounts of carbon dioxide from the atmosphere, the equivalent to the annual emissions of 24m cars each year.</p>\n' +
                    '  <hr class="my-4">\n' +
                    '  <p class="lead">\n' +
                    '    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\n' +
                    '  </p>\n' +
                    '</div>';

                this.$el.html(kulturHtml);
            }
        });
        const Noje = Backbone.View.extend({
            render: function () {
                let nojeHTML = '<div class="jumbotron">\n' +
                    '  <button type="button" class="btn btn-primary goToSport2">&#10094</button>\n' +
                    '    <button type="button" class="btn btn-primary goToKultur2 "> &#10095</button>  <h1 class="display-3">Baby Face Film review </h1>\n' +
                    '  <p class="lead">In contemporary society and pop culture, there is a weird double ' +
                    'standard around feminine youth and innocence. On the one hand, paedophilia is rightly reviled, ' +
                    'and the sexuality of teenage girls is policed by schools and parents.  </p>\n' +
                    '  <hr class="my-4">\n' +
                    '  <p class="lead">\n' +
                    '    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\n' +
                    '  </p>\n' +
                    '</div>';
                this.$el.html(nojeHTML);
            }
        });
        const Nyheter = Backbone.View.extend({
            render: function () {
                let NyheterHTML = '<div class="jumbotron"><button type="button" class="btn btn-primary goToKultur">&#10094</button>\n' +
                    '    <button type="button" class="btn btn-primary goToSport"> &#10095</button> \n' +
                    '  <h1 class="display-3">Spring is coming, and the evil squirrel is back</h1>\n' +
                    '  <p class="lead">I’m sitting alone in the kitchen, drinking coffee and listening to a soft, ' +
                    'rhythmic scraping sound that I assume is coming from somewhere outside – a door being planed two gardens over, ' +
                    '' +
                    'maybe – because I know I’m alone in the house. </p>\n' +
                    '  <hr class="my-4">\n' +
                    '  <p class="lead">\n' +
                    '    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\n' +
                    '  </p>\n' +
                    '</div>';
                this.$el.html(NyheterHTML);
            }
        });
        tabView.render();
     });


