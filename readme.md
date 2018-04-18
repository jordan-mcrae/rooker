# Rooker

Rooker is a lightweight Google Analytics wrapper for React components. Quickly configure and set up event handlers with ease. Rooker intelligently maps your DOM elements with generic or custom click event handlers through simple JSON configuration to keep your GA setup simple and organized.

### Installation
`npm install rooker --save`

### Usage / Example
Rooker is completely opt-in. You can wrap your entire React application with Rooker to add event handlers throughout your entire app, or simply wrap a single component and separate concerns.

1) ` import { Rooker } from './Rooker';`
2) Write your configuration to include the elements you want to track (see config options below).
3) Wrap your configuration in Rooker with your component.

```
import React, { Component } from 'react';
import { Rooker } from './Rooker';

const config = {
	defaults: {
		category : 'My Event',
		action   : 'Click',
		label    : 'My Campaign',
	},
	ua    : 'UA-55555555-4',
	host  : 'none',
	track : [
		'.trackMe',
		'#trackMeToo',
		{
			target   : 'span',
			category : 'SpanClicks',
			action   : 'click',
			label    : 'CustomSpanClickEvent'
		}
	]
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h3>My App</h3>
        </header>
	<button className='trackMe'>Track My Clicks!</button>
        <a href='/' id='trackMeToo'>Track My Clicks Too!</a>
        <span>Track My Clicks</span>
        <span>Track My Clicks</span>
        <span>Track My Clicks</span>
      </div>
    );
  }
}

export default Rooker(config, App);
```

### Configuration Options

1) `defaults` - Set default event configuration. If you want to reuse the same event across your entire configuration, or set a default event, use this.
2) `ua` - Your Google Analytics ID. This is only necessary if you haven't globally configured Google Analytics in your app.
3) `host` - Your Google Analytics host. This is only necessary if you haven't globally configured Google Analytics in your app.
4) `track` - A smart array of strings or objects that you want to add click event trackers to. You can use any combination or strings or objects.
    - Generic DOM elements can be represented as lower case strings: e.g. `'button'`, `'span'`, `'div'`, `'a'`, etc. These elements will be represented in Google Analytics by the settings in `defaults`.
    - Objects have the following properties and add more specific event tracking descriptions:
    ```
    config: {
      track: [
        {
          target   : '#customId',
          category : 'Custom Category',
          action   : 'click',
          label    : 'CustomLabel'
        }
      ]
    }
    ```
    
##### Complete config example:

```
const config = {
	defaults: {
		category : 'My Event',
		action   : 'Click',
		label    : 'My Campaign',
	},
	ua    : 'UA-55555555-4',
	host  : 'none',
	track : [
		'.trackMe',
		'#trackMeToo',
		{
			target   : 'span',
			category : 'SpanClicks',
			action   : 'click',
			label    : 'CustomSpanClickEvent'
		}
	]
}
```




### TODO

 - Add Testing
 - Extend event functionality beyond clicks

License
----

ISC
