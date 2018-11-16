<template>
    <div class="spinner">
        <div class="spn1"></div>
        <div class="spn2"></div>
    </div>
</template>

<style>
.spinner {
  position: absolute;
  margin-top: -12px;
  margin-left: -12px;
  left: 50%;
  top: 50%;
  width: 24px;
  height: 24px;
}

.spinner > div {
  position: absolute;
  left: 0;
  top: 0;  
  height: 24px;
  width: 24px;
  display: block;
  margin: 0;
  -webkit-animation: stretchdelay 6s infinite ease-in-out;
  animation: stretchdelay 6s infinite ease-in-out;
  border-radius: 50%;
}

.spn1{ background: #77b3d1; }
.spn2{ background: #df7f6d; }

.spinner .spn2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%, 100%{
    -webkit-transform: translate(-24px, 0);
  }

  12.5%{
    -webkit-transform: translate(24px, 0);
    background: #DF7F6D;
  }

  25%{
    -webkit-transform: translate(-24px, 0);
    background: #7A997A;
  }

  37.5%{
    -webkit-transform: translate(24px, 0);
    background: #CCAF93;
  }

  50%{
    -webkit-transform: translate(-24px, 0);
    background: #AC99BF;
  }

  62.5%{
    -webkit-transform: translate(24px, 0);
    background: #77B3D1;
  }

  75%{
    -webkit-transform: translate(-24px, 0);
    background: #D8D8D8;
  }

  87.5%{
    -webkit-transform: translate(24px, 0);
    background: #B2B2B2;
  }
}
</style>
