# Validators

<br>

## What are validators?

<br>

Validators are functions that check if the provided object has certain shape/type. They are run inside Props' Validator Function.

<br>

## Root

<br>

First layer of abstraction - Root   
There we have not filtered data, straight from API.   

In your extension you can provide validator for the data fetched from API. It will extend original data props' validator. Return false if shape of data does not fulfill conditions.

Example:
```ts
const plugin: WPExtension = {
  middleware: {
    root: {
      validator (value) {

        if(!('acf' in value)) {
          return false
        }

        if(!('sections' in value.acf)) {
          return false
        }
    
        if(value.acf.sections.length < 1) {
          return false
        }

        return true;
      }
    }
  }
}
```

With that Vue will yield in console about unproper shape of data.
