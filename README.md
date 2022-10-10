# Jump Start Vue.js by Nilson Jacques

## 1. Vue.js: The Basics
## 2. Vue Tooling
## 3. Components
## 4. The composition API
## 5. Routing
## 6. State Management
## 7. Nuxt.js
## 8. Putting It All Together

---
---

# 1. Vue.js: The Basics

## Why Choose Vue?

* ***It’s easy to “sprinkle onto” an existing site***. You can start using Vue on existing websites without having to implement a build step and introduce a new setup and tooling to your workflow. In fact, Vue is the perfect go-to tool for many situations where you’d previously have reached for jQuery!
* ***Vue’s component-based architecture***. Of course, Vue is also more than capable of building modern single-page applications (SPAs), allowing you to develop your apps as modular, reusable components.
* ***Its comprehensive ecosystem***. Pre-built components for almost every conceivable use are available from Vue’s large community of developers. On top of that, popular libraries exist to provide common functionality such as client-side routing, state management, and serverside rendering! Many of these are also maintained by the official Vue team, in contrast to React, where there aren’t always official solutions available.
* ***It’s widely used***. Vue is being used by a diverse range of businesses, from GitLab to the Chinese giant Alibaba. It’s also been adopted by the PHP framework Laravel as its default library for building client-side apps. It’s safe to say that these organizations consider Vue to be a sensible choice with good future prospects. Its popularity also means that it’s easy to get help with your problems on various support sites and forums.

## The Vue Instance

You can create a vue instance by mounting Vue to an element:

```JavaScript
Vue.createApp({}).mount('#main');
```

So far, all we’ve done is tell Vue that we want to create an instance and have it manage an area of the DOM defined by the #main selector. It will use this area of the page as a template.

It will parse this chunk of HTML, looking for expressions that are part of the template language (which we’ll look at shortly) and binding them to our instance data where applicable.

## Reactive Data

To be able to do something useful with our Vue instance, we need to give it some data. We do this by defining a function called data(), which returns an object containing all the data we want Vue to work with.

Any properties that are assigned to the returned object (including nested objects and arrays) become reactive, meaning that Vue will observe them and automatically re-render the UI when they change.

Let’s add some example data to our instance:

```JavaScript
Vue.createApp({
    data() {
        return {
            heading: "Staff Directory",
            employees: [
                {
                "firstName": "amelia",
                "lastName": "austin",
                "photoUrl":
                "https://randomuser.me/api/portraits/thumb/women/9.jpg",
                "email": "amelia.austin@example.com",
                "phone": "(651)-507-3705",
                "department": "Engineering"
                },
                {
                "firstName": "bobbie",
                "lastName": "murphy",
                "photoUrl":
                "https://randomuser.me/api/portraits/thumb/women/79.jpg",
                "email": "bobbie.murphy@example.com",
                "phone": "(925)-667-7604",
                "department": "Management"
                }
            ]
        };
    }
}).mount('#main');
```

## Template Syntax

So now we have our Vue instance, we’ve given it some data, and we’ve told it which part of the page it should be looking at for its template. How do we render our data? We do that by using interpolations and directives

## Interpolations

Interpolations are the way that we insert dynamic values into a template. We use the curly brace syntax (aka the Mustache syntax) to output primitive values from our instance data, such as numbers and strings:

```html
<h1 class="ui center aligned header">{{ heading }}</h1>
```

You can also use any valid JavaScript statement between double braces, which Vue will evaluate before rendering.

Here’s the code:

```JavaScript
<div id="main">
    <p>The price is: {{ price * 1.20 }} (inc. VAT)</p>
</div>
<script>
    Vue.createApp({
        data() {
            return {
                price: 25
            }
        }
    }).mount('#main');
</script>
```

And here’s the output:

```The price is: £30 (inc. VAT)```

In this example, we’re performing a calculation with the data price before outputting it. The calculation is just a normal JavaScript expression.

## Directives

Of course, to build any sort of interesting UI, we need to do more than just display simple values. Vue’s template syntax includes directives for looping and conditional display logic, as well as binding HTML attributes to reactive data properties. Directives are attributes you add to DOM elements and components (very similar to AngularJS’s ng-* directives).

### v-for

The v-for directive allows us to tell Vue that we want a section of our template to be rendered for every item in a collection (which can be an array or an object):

```JavaScript
<tbody>
    <tr v-for="employee in employees">
        <td>
            <img
            src="https://randomuser.me/api/portraits/thumb/women/9.jpg"
            class="ui mini rounded image" />
        </td>
        <td>{{ employee.firstName }}</td>
        <td>{{ employee.lastName }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ employee.phone }}</td>
        <td>{{ employee.department }}</td>
    </tr>
</tbody>
```

Here, the <tr> element with the v-for directive, and all its child elements, will be repeated for each employee in the array

### v-if

Another common piece of UI logic is rendering elements conditionally. Using the v-if directive will cause Vue to render the element only if the data property or expression evaluates as truthy:

```html
<tbody>
    <tr v-for="employee in employees">
        ...
    </tr>
    <tr v-if="employees.length === 0">
        <td colspan="6">No employees found</td>
    </tr>
</tbody>
```

The code above will display a fallback message if the employees array is empty. This is useful for code where the data is being loaded dynamically (that is, from an API).

As you might expect, there’s also a v-else counterpart, as well as v-elseif, to allow you to handle more complex conditions:

```html
<tbody>
    <tr v-for="employee in employees"> ... </tr>
    <tr v-if="isLoadingData">
        <td colspan="6"><img src="spinner.gif" /></td>
    </tr>
    <tr v-else-if="employees.length === 0">
        <td colspan="6">No employees found</td>
    </tr>
</tbody>
```

### v-bind

Often you’ll want to take data from your instance and pass it as an attribute to an HTML element—for example, using a URL string as an href or src attribute.

Going back to our example, we’ll bind each employee’s profile photo to the <img> element using the v-bind directive:

```html
<img v-bind:src="employee.photoUrl" class="ui mini rounded
image" />
```

By doing this, Vue knows to update the attribute any time the bound property changes.

Vue allows you to use a shorthand for binding attributes, prefixing them with : rather than the more verbose v-bind:.

```html
<img :src="employee.photoUrl" class="ui mini rounded image" />
```

### v-model

Vue also includes two-way binding for use with form inputs. This allows changes to the input to update the data property:

```html
<div id="main">
    <input v-model="text" placeholder="edit me">
    <p>Text is: {{ text }}</p>
</div>
<script>
    Vue.createApp({
        data() {
            return {
                text: 'Good golly, Miss Molly'
            }
        }
    }).mount('#main');
</script>
```

In the example above, the v-model directive is being used to bind the text property to the <input> element. When Vue initially renders the template, the input will be pre-filled with the content of text. Changing the input field will cause the text property to be updated and the output inside the <p> element to be re-rendered.

### v-on

We can use the v-on:<event> syntax for attaching listeners to events that are emitted by elements and components:

```html
<button v-on:click="heading = 'Hello, World!'">Click Me</button>
```

In the example above, the heading property on our instance data would be set to “Hello, World!” when the button is clicked. As with interpolations, the values you pass to directives can include any valid JavaScript expression, and can directly reference instance data properties as if they were local variables.

Vue allows you to use a shorthand for binding event handlers, prefixing them with @ rather than the more verbose v-on:. We’ll be using this shorter syntax throughout the rest of the book.

As well as modifying data properties, you can also call custom methods on your Vue instance. The method will receive the event object as the first argument.

Here’s the JavaScript:

```JavaScript
Vue.createApp({
    data() {
        return {
            status: ''
        }
    },
    methods: {
        updateStatus(event) {
            const buttons = ['left', 'middle', 'right'];
            this.status = `You clicked the ${buttons[event.button]}
            mouse button.`;
        }
    }
}).mount('#main');
```

And here’s the template:

```html
<div id="main">
    <button @mousedown="updateStatus"
            @contextmenu.prevent="">Toggle Me!
    </button>
    <p>{{ status }}</p>
</div>
```

In the example above, we attach a handler to the button’s mousedown event. Within the handler, we inspect the event object to find out which mouse button was clicked and display it to the user.

There’s a second handler listening in to the contextmenu event, as we want to prevent the browser’s context menu from appearing when right-clicking. We don’t actually need a handler function here, as Vue has some built-in modifiers we can chain on to events for common use cases

Some of the most common ones are:

* .stop: stops propagation of the event (like calling event.stopPropagation())
* .prevent: prevents the default action from being fired (like calling event.preventDefault())
* .capture: use event capturing when listening
* .once: attaches the handler to listen for the first firing of the event only

## Methods

Defining your own methods helps keep your UI logic together and out of your template. This helps keep the templates clean and readable and makes your logic easier to test.

As we briefly saw in the previous section, you can define custom methods on your Vue instance by adding them to an object under the methods property:

```JavaScript
methods: {
    updateStatus(event) {
        const buttons = ['left', 'middle', 'right'];
        this.status = `You clicked the ${buttons[event.button]}
        button.`;
    }
}
```

Vue binds these methods to the instance so that other methods and data are available as properties of this, meaning we can easily access all of our instance data and call other methods.

As with data properties, methods are available directly in the template scope.

### Template Scope

Vue templates have access to all the data and methods defined on the instance they’re rendered from. They don’t have access to built-in browser APIs (such as console.log), so you’ll need to wrap these in an instance method in order to call them from the template.

## Computed Properties

There are often times when you’ll want to use a custom method to compute some derived data to use in your template. The problem is that you want to avoid computationally expensive methods being called more often than necessary. Vue’s solution to this is “computed properties”.

A computed property is actually a function whose output is cached and returned on subsequent calls (similar to a memoized function). If the function depends on an item of reactive data, and that data changes, the function will be re-run and the output re-cached.

However, if something else changes in the Vue instance (such as another property that’s independent of the computed property being updated), the cached result will be returned and we’ll be spared running the (potentially expensive) function.

To see this in practice, along with some of the other concepts presented in this chapter, let’s add some basic functionality to our staff directory.

It would be nice to sort the table according to which column header is clicked by the user. Let’s start by adding a sortBy property to our instance data, and give it a default value:

```JavaScript
computed: {
    sortedEmployees() {
        return this.employees.sort((a, b) =>
            a[this.sortBy].localeCompare(b[this.sortBy]))
    }
}
```

# 2. Vue Tooling

\-