enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Calendar Demo"},
     {kind: 'Calendar'}
  ]
});
