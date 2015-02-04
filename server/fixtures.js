if (Cessions.find().count() === 0) {
  Cessions.insert({
    title: 'Cession 1',
    url: 'http://google.com/'
  });

  Cessions.insert({
    title: 'Cession 2',
    url: 'http://google.com/'
  });

  Cessions.insert({
    title: 'Cession 3',
    url: 'http://google.com/'
  });
}
