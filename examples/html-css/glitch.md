Glitch.

![img.png](../../images/glitch.png)

```html
<div class="box">
  <h1 class="glitch">Glitch</h1>
</div>
```

```scss
* {
  margin:0;
  padding:0;
}
body, html {
  width:100%;
  height:100%;
}
body {
  background-color: #000;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .glitch {
    color:#fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size:100px;
    position: relative;
    padding:30px;
    &:before, &:after {
      content:'Glitch';
      color:#fff;
      position: absolute;
      top:0;
      overflow:hidden;
      padding:30px;
    }
    &:before {
      left:3px;
      text-shadow: -3px 0 red;
      animation: glitch-before 2s linear 0s infinite alternate;
    }
    &:after {
      left:-3px;
      text-shadow: -3px 0 blue;
      animation: glitch-after 2s linear 0s infinite alternate;
    }
  }
}

@keyframes glitch-before {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip: rect(random(150)+px, 350px, random(150)+px, 30px)
    }
  }
}

@keyframes glitch-after {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      clip: rect(random(150)+px, 350px, random(150)+px, 30px)
    }
  }
}
```
