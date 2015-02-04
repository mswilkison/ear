if (Assets.find().count() === 0) {
  Assets.insert({
    title: 'Cession 1',
    url: 'http://google.com/'
  });

  Assets.insert({
    title: 'Cession 2',
    url: 'http://google.com/'
  });

  Assets.insert({
    title: 'Cession 3',
    url: 'http://google.com/'
  });
}
