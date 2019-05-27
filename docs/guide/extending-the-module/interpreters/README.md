# Installation

<br>

## What is interpreter?

<br>

Interpreter allows developer separate data to smaller chunks based on his own rules. In ACF extension, we used it to split into parts Fetched Data based on data object's shape.

For now, we have 2 possible interpreters.

<br>

## Root

<br>

There we have access to plain data, fetched straight from the API. If your data contains multiple sections/rows - it could be a good place to split it. For real, we are straight in Root Component's Render Function.

Before looking at example let's answer the utmost important question.

### What is TheRoot functional component doing?
1. Getting given data (downloaded from API) by props
2. Separating data to the smaller parts, called SectionData.
3. Load Section/AlternativeSection component and provide here proper data.


### How to add my own hook in an extension?
Add interpret function to your extension object inside root object which is inside middleware object (middleware.root.**interpret**). It has to have 3 arguments

```
data - response data to process
chosenSection - section component, it can be Vue Component Object, or just a string if the corresponding component is registered globally
h - createElement function, used by VueJS to create VNode
```

### Real Life Example
Let's create **interpret** hook function which will separate data and render a few sections. Each section should be present in data.acf.sections array. So we have a plain function in our plugin:
```ts
const plugin: WPExtension = {
  middleware: {
    root: {
      interpret (data, chosenSection, h) {
        
      }
    }
  }
}
```

It should return an Array of VNodes or throw an error if conditions aren't fulfilled. So prepare the corresponding structure:
```ts
const plugin: WPExtension = {
  middleware: {
    root: {
      interpret (data, chosenSection, h) {
        const wpSections = []

        if(MY_CONDITIONS) {
      
        } else {
          throw new Error('Conditiong is not fullfilled')
        }

        return wpSections
      }
    }
  }
}
```

Okay, we have a basic function's body. Now ask yourself. What is the condition? In our example we want to use _data.acf.sections_ later. So we need to make sure _data.acf_ is an object which contains _sections_ key. Our condition will be something like:
```js
if(data.acf && data.acf.sections) { }
```

Inside of it, we should iterate over _data.acf.sections_. By each iteration, we will create a VNode and push it to the array. 
```ts
const plugin: WPExtension = {
  middleware: {
    root: {
      interpret (data, chosenSection, h) {
        const wpSections = []

        if(data.acf && data.acf.sections) {
          for(let el of data.acf.sections) {
            wpSections.push(
              h(chosenSection, {
                props: {
                  data: el
                }
              })
            )
          }
        } else {
          throw new Error('Conditions are not fullfilled')
        }

        return wpSections
      }
    }
  }
}
```

That's the whole middleware.root.**interpret** function from ACF Extension.
If you would like to learn more about h/createElement function, you can do it [here](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments)

<br>

## Section

<br>

To better understand the idea of extending Section created lifecycle hook (Section interpret), firstly we have to answer the question.

### What is Section's created doing?
1. Getting given data (from the Root) by props
2. Separating data to the smaller parts, called ColumnData.
3. Add information to ColumnData like Block component's name and the number of columns
4. Creating the class name for a section, that describes the number of columns
5. Load Column/AlternativeColumn component and provide here proper data.

### What can we do with the hook?
The primary purpose is to allow developers to design alternative data separating mechanism. For example, in ACF Extension, we use this hook to separate section to columns and load custom __Block components__.

### How to add my own hook in an extension?
As the main purpose of extending section is interpreting data. To add our own interpreter, inside 'section', create a **interpret** function with one argument - data. Moreover, you have to keep this structure inside 'middleware'. Everything that is modifying a data we will keep inside 'middleware'
```
data - data to process
```
The hook must return Object containing at least 3 certain keys:
```
columns - an array of data about each column
columnAmount - the number of columns provided data contains
anyFilledColumn - Is any column filled? If each one is empty, there is no point to render the whole Section 
```

### Base _section.interpret_ structure
```js
middleware: {
  section: {
    interpret (data) {
      if(SOME_CONDITIONS) {
        throw new Error('Bad data structure')
      }

      const columns = data['columns']
      const columnAmount = 2
      let anyFilledColumn = false

      return {
        columns,
        anyFilledColumn,
        columnAmount
      }
    }
  }
}
```

To each object in the columns array, you have to add 2 information:
```
cmpName - Component name which will be rendered inside column (default value should be "Default")
columnAmount - the number of columns in row
```

If something goes wrong just throw an error.

<br>

