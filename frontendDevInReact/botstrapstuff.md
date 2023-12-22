# button formatting
to make a button highlighted when you click it
```typescript
<button
          onClick={() => handleClickedButton("makePost")}
          id="makePost"
          type="button"
          className={`btn ${selected === "makePost" ? "btn-primary" : "btn-outline-primary"}`}
        >
```