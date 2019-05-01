/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url in allFeeds are defined', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                const tempFeedURL = allFeeds[i].url;
                expect(tempFeedURL).toBeDefined();
                expect(tempFeedURL.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         * 
         */
        it('name in allFeeds are defined', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                const tempFeedName = allFeeds[i].url;
                expect(tempFeedName).toBeDefined();
                expect(tempFeedName.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        let bodyElement = document.querySelector('body');

        it('should be hidden by default', function () {
            expect(bodyElement.getAttribute('class')).toContain('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function () {
            $('.menu-icon-link').trigger("click");
            expect(bodyElement.getAttribute('class')).toEqual('');
            expect(bodyElement.getAttribute('class').length).toEqual(0);

            $('.menu-icon-link').trigger("click");
            expect(bodyElement.getAttribute('class')).toContain('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('at least a single .entry element within the .feed container when the loadFeed() is called', function () {
            const container = document.querySelector('.feed');
            const childNodes = container.childNodes;
            for (let aNode of childNodes) {
                if (aNode.tagName === 'A') {
                    for (let articleNode of aNode.childNodes) {
                        if (articleNode.tagName === 'ARTICLE') {
                            expect(articleNode.className).toEqual('entry');
                        }
                    }
                }
            }
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let domContent1;
        let domContent2;
        beforeEach(function (done) {
            loadFeed(0, function () {
                domContent1 = document.querySelector('.feed').cloneNode(true);
                done();
            });
        });

        it('is different', function (done) {
            loadFeed(1, function () {
                domContent2 = document.querySelector('.feed');
                expect(domContent1.childNodes.length).toEqual(domContent2.childNodes.length);
                expect(domContent1).not.toEqual(domContent2);
                expect(domContent1.childNodes[1]).not.toEqual(domContent2.childNodes[1]);
                expect(domContent1.childNodes[1].getAttribute('href')).not.toEqual(domContent2.childNodes[1].getAttribute('href'));
                done();
            });
        });

    });

}());
