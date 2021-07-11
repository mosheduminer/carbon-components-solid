# Developing

Use [AccordionItem](lib/src/AccordionItem.tsx) as a reference.

+ First, define a Props type, based on the props passed to the react component, and based on the prop-types definition that is usually at the bottom of the file, which tells us what type each props should be
+ Then, we use splitProps to split all the explicit props from the rest (as we define the Props type as a unions with & JSX.HTMLAttributes<HTMLLIElement>;, so you can also pass any props that belongs on a LI element, or whatever HTML element the component is using). Then we use mergeProps to set default props
+ Most of the rest is just copy paste, then fix it up to work with solid
+ Move useMemos and useCallbacks into arrow functions, useEffect to createEffect (or no effect at all, if appropriate), change state to signal, etc.
+ instead of `cx` from classnames, use solid's `classList`. Sometimes it will be usefull to extract the classList to a variable, if so, just remember to define it as a function (`() => {"class": true}`), so it remains reactive.
