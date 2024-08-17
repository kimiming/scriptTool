function toast() {
  console.show();
  let hello = "Hello World!";
  //循环打印十次hello world
  for (var i = 0; i < 10; i++) {
    console.log(hello);
  }

  toast("Hello World!");
}

toast();
