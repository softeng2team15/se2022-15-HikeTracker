CREATE TABLE IF NOT EXISTS HIKES (
	IDHike INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Name VARCHAR NOT NULL,
	Length INTEGER NOT NULL,
	ExpectedTime INTEGER NOT NULL,
	Ascent INTEGER NOT NULL,
	Difficulty VARCHAR NOT NULL,
	StartPoint VARCHAR NOT NULL,
	EndPoint VARCHAR NOT NULL,
	ReferencePoints VARCHAR,
	Description VARCHAR
	);

CREATE TABLE IF NOT EXISTS HIKESMAPDATA (
	IDHike INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Coordinates VARCHAR NOT NULL,
	Center VARCHAR NOT NULL,
	FOREIGN KEY(IDHike) REFERENCES HIKES(IDHike) ON INSERT CASCADE ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS POINTS (
	IDPoint INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Name VARCHAR NOT NULL,
	Coordinates VARCHAR NOT NULL,
	GeographicalArea VARCHAR NOT NULL,
	TypeOfPoint VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS HUTS (
	IDPoint	INTEGER NOT NULL,
    FOREIGN KEY(IDPoint) REFERENCES POINTS(IDPoint) ON INSERT CASCADE ON UPDATE CASCADE ON DELETE CASCADE
	PRIMARY KEY(IDPoint)
);

CREATE TABLE IF NOT EXISTS PARKINGS (
	IDPoint	INTEGER NOT NULL,
    FOREIGN KEY(IDPoint) REFERENCES POINTS(IDPoint) ON INSERT CASCADE ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(IDPoint)
);

CREATE TABLE IF NOT EXISTS USERS (
    Username VARCHAR NOT NULL PRIMARY KEY,
    Type VARCHAR NOT NULL,
    Password VARCHAR NOT NULL,
    Salt VARCHAR NOT NULL
);

INSERT INTO HIKES (Name ,Length, ExpectedTime, Ascent, Difficulty, StartPoint, EndPoint, ReferencePoints, Description)
VALUES  ('Beccetto Bagnour',1000, 20, 50, 'TOURIST', 'Myhouse', 'YourHouse', NULL, 'This is a hike'),
	('Rocciamelone',1000, 20, 50, 'TOURIST', 'Myhouse', 'YourHouse',NULL,'WOoow');

INSERT INTO HIKESMAPDATA(Coordinates,Center)
VALUES ('[[44.58928456529975,7.203381098806858],[44.58930803462863,7.203349834308028],[44.58968295715749,7.203118745237589],[44.5901314727962,7.202335372567177],[44.590321741998196,7.202131859958172],[44.590778136625886,7.201792476698756],[44.59154482930899,7.201541438698769],[44.59173518233001,7.20133532769978],[44.59232644177973,7.199428780004382],[44.59217883646488,7.199334483593702],[44.59195747040212,7.199550066143274],[44.59185822866857,7.199494326487184],[44.59189544431865,7.199355186894536],[44.59200097247958,7.19912133179605],[44.59241772070527,7.198588997125626],[44.59281108342111,7.1978166885674],[44.592999843880534,7.19709936529398],[44.592967573553324,7.196288499981165],[44.593030186370015,7.195908296853304],[44.59329664707184,7.195259286090732],[44.59364416077733,7.194826528429985],[44.59416065365076,7.194386478513479],[44.594278670847416,7.194166956469417],[44.5943296328187,7.193765630945563],[44.594721822068095,7.192628039047122],[44.59509003907442,7.192617645487189],[44.59512121975422,7.192404996603727],[44.5951565913856,7.192530557513237],[44.5952482894063,7.192554781213403],[44.59521786309779,7.192096123471856],[44.59509003907442,7.191995289176702],[44.59504167549312,7.191797224804759],[44.594774041324854,7.19150603748858],[44.594368021935225,7.191317696124315],[44.59383677691221,7.191542834043503],[44.59373703226447,7.191364048048854],[44.5935785304755,7.191524477675557],[44.59335842169821,7.191459434106946],[44.59303379058838,7.191190039739013],[44.59294209256768,7.191188279539347],[44.592749644070864,7.191375866532326],[44.59261318668723,7.191391289234161],[44.59237522445619,7.191247455775738],[44.592186799272895,7.191215772181749],[44.592035841196775,7.191275032237172],[44.59185034967959,7.19091041944921],[44.591661589220166,7.190766334533691],[44.59144248627126,7.190799694508314],[44.59142278879881,7.190671283751726],[44.59136755205691,7.190636498853564],[44.5910728443414,7.190915448591113],[44.590818118304014,7.190874041989446],[44.59057068452239,7.190471542999148],[44.59025418385863,7.190450672060251],[44.59009878337383,7.190570449456573],[44.58997892215848,7.1905551943928],[44.5898103620857,7.190307676792145],[44.58953216671944,7.189852790907025],[44.589357655495405,7.189873661845922],[44.589347429573536,7.189964186400175],[44.589315662160516,7.189935268834233],[44.58931767381728,7.189985476434231],[44.58942932076752,7.189821861684322],[44.58941959775984,7.189429337158799],[44.58931867964566,7.189172096550465],[44.58876161836088,7.188804717734456],[44.588557267561555,7.188546387478709],[44.58865223452449,7.18825226649642],[44.58885398693383,7.187935933470726],[44.58929864689708,7.187661845237017],[44.589293617755175,7.187580959871411],[44.58956418558955,7.187530919909477],[44.589851181954145,7.187571572139859],[44.58993097767234,7.187455650418997],[44.59008788689971,7.18744408339262],[44.590099453926086,7.187332520261407],[44.59019115194678,7.187414495274425],[44.5906322915107,7.187269320711493],[44.5906565990299,7.187176197767258],[44.590815436095,7.187236296012998],[44.59095172584057,7.187032448127866],[44.59092926234007,7.186917029321194],[44.59100453183055,7.185958558693528],[44.59128557704389,7.184940492734313],[44.59115205332637,7.184760197997093],[44.59093823097646,7.18479179777205],[44.59085256792605,7.184727843850851],[44.590692054480314,7.184196347370744],[44.590604631230235,7.184136584401131],[44.590394580736756,7.184222247451544],[44.59037999622524,7.184135746210814],[44.59048326127231,7.184036336839199],[44.59032375365496,7.18407497741282],[44.590293327346444,7.184009598568082],[44.59038921631873,7.183883199468255],[44.59012535400689,7.183790327981114],[44.59014153108001,7.183211222290993],[44.58994539454579,7.182817524299026],[44.58996785804629,7.182452660053968],[44.58983433432877,7.182110426947474],[44.58973886445165,7.18150676228106],[44.58989577367902,7.18112756498158],[44.589934749528766,7.181141059845686],[44.589907340705395,7.180933356285095],[44.590143794193864,7.180133638903499],[44.59019794128835,7.179863741621375],[44.590219147503376,7.179349260404706],[44.59000029601157,7.178840646520257],[44.58996978588402,7.178290961310267],[44.590141363441944,7.177834734320641],[44.59021118469536,7.178341252729297],[44.59030196070671,7.178188534453511],[44.59107016213238,7.178067918866873],[44.59163988009095,7.177385464310646],[44.592009857296944,7.176444930955768],[44.591922434046865,7.176499748602509],[44.59197205491364,7.176548782736063],[44.592104237526655,7.176120886579156],[44.59212829358876,7.175510935485363],[44.591899551451206,7.1743468567729],[44.591589169576764,7.173821227625012],[44.59149059839547,7.173402551561594],[44.59171514958143,7.171610333025455],[44.59192117676139,7.17137211933732],[44.59190768189728,7.170906085520983],[44.592011366039515,7.170742135494947],[44.59235083311796,7.170456983149052],[44.592427276074886,7.170146517455578],[44.59266926161945,7.169696660712361],[44.59289314225316,7.168910522013903],[44.59316622465849,7.168345581740141],[44.59332757629454,7.168080462142825],[44.593260772526264,7.167967557907104],[44.593319026753306,7.167835375294089],[44.59349127486348,7.167666479945183],[44.59380207583308,7.167029958218336],[44.59368607029319,7.166889728978276],[44.59340586327016,7.166831558570266],[44.593166057020426,7.166469376534224],[44.592836229130626,7.166160587221384],[44.59270287305117,7.16623418033123],[44.59258175455034,7.166178021579981],[44.59233934991062,7.165176216512918],[44.59213374182582,7.16474924236536],[44.592073475942016,7.164789978414774],[44.59202812984586,7.164290584623814],[44.59181958809495,7.164227720350027],[44.59169352427125,7.164097046479583],[44.591389428824186,7.164024794474244],[44.59134416654706,7.163950530812144],[44.59103252738714,7.163914320990443],[44.59083303809166,7.16375045478344],[44.590736059471965,7.163741318508983],[44.590620221570134,7.163685578852892],[44.59063237532973,7.163673676550388],[44.59060815162957,7.163675855845213],[44.590812334790826,7.1637455932796],[44.591259425505996,7.164109367877245],[44.59166217595339,7.164062093943357],[44.59190357476473,7.164279269054532],[44.592080768197775,7.16467397287488],[44.59240942262113,7.165117627009749],[44.59336546249688,7.165721291676164],[44.59410206414759,7.165991440415382],[44.59480606019497,7.166455797851086],[44.59513605572283,7.166382623836398],[44.59575883112848,7.16648387722671],[44.59678444080055,7.166441967710853],[44.596480848267674,7.166696442291141],[44.596422258764505,7.166887130588293],[44.59618706256151,7.167175216600299],[44.59649534896016,7.167274374514818],[44.59667153656483,7.167258448898792],[44.59657992236316,7.167505379766226],[44.59668888710439,7.167591461911798],[44.597084764391184,7.167546534910798],[44.59732063114643,7.167800758033991],[44.597618943080306,7.167858928442001],[44.59803636185825,7.167751723900437],[44.5979593321681,7.167936880141497],[44.59801498800516,7.168028242886066],[44.59872577339411,7.168047437444329],[44.59919113665819,7.167961187660694],[44.59944653324783,7.168077193200588],[44.599540242925286,7.168062943965197],[44.59981877356768,7.168384473770857],[44.60024616681039,7.16853559948504],[44.600520422682166,7.168787894770503],[44.601219641044736,7.169142784550786],[44.6014391630888,7.169512594118714],[44.601536728441715,7.169571854174137],[44.60166731849313,7.169464733451605],[44.601725321263075,7.169535476714373],[44.601866472512484,7.169563975185156],[44.60200452245772,7.169895898550749],[44.60227131843567,7.169815180823207],[44.60255915299058,7.169939568266273],[44.602588741108775,7.170061692595482],[44.602683959528804,7.169976197183132],[44.602666944265366,7.169986590743065],[44.60278839804232,7.170090358704329],[44.60295997560024,7.170023219659925],[44.6031744685024,7.169601358473301],[44.60324621759355,7.169308997690678],[44.603261640295386,7.169051840901375],[44.603219982236624,7.169108921661973],[44.60317765362561,7.169526591897011],[44.603058798238635,7.169760363176465],[44.60322434082627,7.169340932741761],[44.60328385233879,7.168706841766834],[44.60335174575448,7.167754992842674],[44.60331419482827,7.167090643197298],[44.604040486738086,7.166697364300489],[44.60359171964228,7.164877485483885],[44.603710658848286,7.164501138031483],[44.603737480938435,7.164102327078581],[44.60351938381791,7.162870271131396],[44.60368953645229,7.16209058649838],[44.60353639908135,7.161327162757516],[44.60325158201158,7.160558123141527],[44.603234650567174,7.160161072388291],[44.60349113680422,7.159883882850409],[44.60408759303391,7.159571321681142],[44.60503743030131,7.159487754106522],[44.60563472472131,7.159611135721207],[44.60567479021847,7.159560425207019],[44.60523474030197,7.158601451665163],[44.60502628237009,7.157528148964047],[44.605852235108614,7.156453840434551],[44.60569079965353,7.15622023679316],[44.6050344966352,7.156042791903019],[44.60441297851503,7.155715227127075],[44.60424441844225,7.155507188290358],[44.60429621860385,7.155118435621262],[44.60410268045962,7.154944259673357],[44.60409044288099,7.154038762673736],[44.60434173233807,7.153455717489123],[44.60451859049499,7.152708722278476],[44.604192450642586,7.152559440582991],[44.60407149977982,7.15228384360671],[44.60378609597683,7.151010716333985],[44.60253216326237,7.149630971252918],[44.60230015218258,7.1491345949471],[44.60150554776192,7.148323142901063],[44.60137805901468,7.148245526477695],[44.60145919583738,7.148962179198861],[44.60139197297394,7.149258982390165],[44.60117865353823,7.14955922216177],[44.600743632763624,7.149692326784134],[44.60055428557098,7.149662151932716],[44.60039938800037,7.149784024804831],[44.59990527480841,7.149918135255575],[44.599733194336295,7.150060459971428],[44.59959799423814,7.150083342567086],[44.599491376429796,7.149896761402488],[44.59967854432762,7.14960565790534],[44.599775187671185,7.149156890809536],[44.59973436780274,7.148884646594524],[44.59958382882178,7.148700244724751],[44.59889399819076,7.148435628041625],[44.59846601821482,7.148393467068672],[44.59777358919382,7.147720567882061],[44.59698258899152,7.147374479100108],[44.596280017867684,7.147227460518479],[44.59562161937356,7.147307842969894],[44.595379466190934,7.147197537124157],[44.59521358832717,7.147016152739525],[44.5951531548053,7.146809119731188],[44.595309644937515,7.146527487784624],[44.595604268833995,7.144878851249814],[44.5960115455091,7.143101552501321],[44.59598648361862,7.142648678272963],[44.595886738970876,7.142315497621894],[44.59541869349778,7.142204772680998],[44.59515793249011,7.141996985301375],[44.594881078228354,7.140737688168883],[44.594617299735546,7.140021789819002],[44.59429887123406,7.139784079045057],[44.593917997553945,7.139627924188972],[44.59362597204745,7.139018392190337],[44.593300335109234,7.138604242354631],[44.59310034289956,7.138169473037124],[44.59284561686218,7.138046678155661],[44.59233105182648,7.137372018769383],[44.59217917174101,7.137456256896257],[44.59194523282349,7.137146294116974],[44.59158833138645,7.137023163959384],[44.5912472717464,7.136701047420502],[44.59117694757879,7.136715883389115],[44.59112975746393,7.136559560894966],[44.59092792123556,7.136579928919673],[44.59068291820586,7.136042732745409],[44.59073195233941,7.135626571252942],[44.59096295759082,7.135403444990516],[44.5913799572736,7.135166320949793],[44.592059226706624,7.134543797001243],[44.59231705404818,7.134052198380232],[44.59266976453364,7.133646095171571],[44.59266339428723,7.133439816534519],[44.59252794273198,7.133387848734856],[44.592522075399756,7.133396482095122],[44.592490727081895,7.133434871211648],[44.592474130913615,7.133368235081434],[44.592533726245165,7.133404780179262],[44.59246516227722,7.133271172642708],[44.59253003820777,7.133368570357561],[44.592512771487236,7.133293384686112],[44.592452086508274,7.133329091593623],[44.59241612814367,7.133243177086115],[44.592502964660525,7.133406875655055],[44.59268216975033,7.133417017757893],[44.59275626577437,7.133135721087456],[44.592795157805085,7.132225446403027],[44.593157172203064,7.131071845069528],[44.593162117525935,7.130891131237149],[44.59284863434732,7.130440352484584],[44.592865984886885,7.129992255941033],[44.5927978400141,7.129750270396471],[44.59273975342512,7.129719676449895],[44.59250061772764,7.129247188568115],[44.59251922555268,7.129085753113031],[44.592469772323966,7.129175690934062],[44.592216135933995,7.128722816705704],[44.59217154420912,7.128409249708056],[44.59194305352867,7.127887643873692],[44.59205553866923,7.127761747688055],[44.591857893392444,7.127366038039327],[44.591991333290935,7.127217426896095],[44.59223164245486,7.127126399427652],[44.59243079647422,7.126456936821342],[44.592744782567024,7.126046642661095],[44.59290127269924,7.125705750659108],[44.5927320420742,7.125335773453116],[44.592958772554994,7.124445531517267],[44.592982744798064,7.124386690557003],[44.59296933375299,7.123904647305608],[44.5927597861737,7.123255217447877],[44.592250753194094,7.122910218313336],[44.59211966022849,7.122609978541732],[44.59210675209761,7.122452650219202],[44.59168137051165,7.121808081865311],[44.591612638905644,7.121547991409898],[44.59149554371834,7.120570577681065],[44.59173702634871,7.119471961632371],[44.59166804328561,7.119082538411021],[44.59169369190931,7.118725469335914],[44.59132396616042,7.117985766381025],[44.591270070523024,7.117316136136651],[44.59128566086292,7.116895448416471],[44.59172956645489,7.115160394459963],[44.59136864170432,7.114730151370168],[44.59112757816911,7.114125229418278],[44.59123679436743,7.113028038293123],[44.5912850741297,7.112960647791624],[44.59138473495841,7.112327227368951],[44.591887816786766,7.110934322699904],[44.591932743787766,7.110642967745662],[44.592244969680905,7.11041959002614],[44.59235267713666,7.11020702496171],[44.59220842458308,7.109424155205488],[44.592058723792434,7.109096338972449],[44.59223013371229,7.108787633478642],[44.59212024696171,7.108614463359118],[44.591901898384094,7.108584539964795],[44.591775918379426,7.108402149751782],[44.59145715460181,7.107623973861337],[44.5913162548095,7.107505118474364],[44.59128557704389,7.107183169573545],[44.59132522344589,7.10653935559094],[44.59147023037076,7.105991849675775],[44.59133033640683,7.10494251921773],[44.591372245922685,7.104641273617744],[44.591259341686964,7.104479586705565],[44.5912332739681,7.104257717728615],[44.59132966585457,7.104032579809427],[44.59131273441017,7.103373175486922],[44.59116127341986,7.102941088378429],[44.59129144437611,7.102795075625181],[44.5913093816489,7.102848216891289],[44.591305861249566,7.102823155000806],[44.5913350302726,7.102803876623511],[44.59132027812302,7.102854838594794],[44.59149126894772,7.102832039818168],[44.59164029918611,7.102581420913339],[44.59188932552934,7.101824954152107],[44.59175462834537,7.100147735327482],[44.59164901636541,7.099922932684422],[44.591587744653225,7.099407948553562],[44.59175764583051,7.098797494545579],[44.591798381879926,7.098220819607377],[44.591649267822504,7.097188755869865],[44.59177155978978,7.096083099022508],[44.59229048341513,7.094661863520741],[44.59229945205152,7.094490956515074],[44.592329962179065,7.093946384266019],[44.59280773065984,7.092614835128188],[44.59302264265716,7.091635577380657],[44.59299825131893,7.091231066733599],[44.593175360932946,7.091127717867494],[44.59316463209689,7.090755142271519],[44.59327904507518,7.090434031561017],[44.593297066167,7.089953161776066],[44.593412820249796,7.089771777391434],[44.5935679692775,7.089179679751396],[44.5939408801496,7.088642232120037],[44.594334326684475,7.087790379300714],[44.59467764943838,7.087547387927771],[44.59471729584038,7.087347898632288],[44.59489499218762,7.087093424052],[44.59507126361132,7.086611883714795],[44.59552237764001,7.086187424138188],[44.595505530014634,7.086030766367912],[44.59555917419493,7.086069323122501],[44.595722956582904,7.08593437448144],[44.595925295725465,7.085400363430381],[44.59626853466034,7.084791837260127],[44.596592746675014,7.084528980776668],[44.59674638696015,7.084467792883515],[44.59706607274711,7.083597164601088],[44.597286181524396,7.082169642671943],[44.597282744944096,7.08188951946795],[44.59719012491405,7.081561870872974],[44.59709976799786,7.081514094024897],[44.59708007052541,7.081172363832593],[44.597173780202866,7.080603735521436],[44.59730286151171,7.08021892234683],[44.5974291767925,7.079805694520473],[44.597467398270965,7.079183673486114],[44.59728014655411,7.078887624666095],[44.5972222276032,7.078406838700175],[44.597102366387844,7.078484119847417],[44.59709716960788,7.078707246109843],[44.597186520695686,7.078544469550252],[44.59716472774744,7.078654943034053],[44.59706062451005,7.078712275251746],[44.597322139889,7.078177677467465],[44.59782547317445,7.077910797670484],[44.598257560282946,7.078066365793347],[44.598504826426506,7.077940888702869],[44.59871856495738,7.077930998057127],[44.598914198577404,7.077762186527252],[44.59939682856202,7.077606366947293],[44.59987602196634,7.078218581154943],[44.60009101778269,7.078781425952911],[44.60095955058932,7.079132124781609],[44.60127647034824,7.079471424221992],[44.60140831768513,7.079493133351207],[44.601674024015665,7.079408224672079],[44.60232798010111,7.079692287370563],[44.60257382132113,7.079733023419976],[44.60321336053312,7.079478884115815],[44.60346766747534,7.079182583838701],[44.60376715287566,7.079045623540878],[44.60392003878951,7.079095998778939],[44.603985249996185,7.07924067042768],[44.60432295687497,7.079318538308144],[44.60465203039348,7.079241340979934],[44.60488663986325,7.079075966030359],[44.6050913259387,7.079047635197639],[44.6052157972008,7.079174285754561],[44.605450155213475,7.079146960750222],[44.60583019070327,7.078979825600982],[44.606080893427134,7.079071775078773],[44.60622355341911,7.079015532508492],[44.6062105614692,7.079070685431361],[44.60625842213631,7.078996170312166],[44.606264624744654,7.079068925231695],[44.606316927820444,7.078924924135208],[44.606300331652164,7.078988123685122],[44.60644072853029,7.078917548060417],[44.60628063417971,7.078963564708829],[44.606413738802075,7.07903397269547],[44.606549022719264,7.079008743166924],[44.606595458462834,7.078892150893807],[44.60689393803477,7.078943448141217],[44.60724161937833,7.079223990440369],[44.607749143615365,7.079136734828353],[44.60808542557061,7.079312419518828],[44.608200592920184,7.079298421740532],[44.608803587034345,7.078916961327195],[44.60905068553984,7.078918134793639],[44.60938914678991,7.079017292708158],[44.60968234576285,7.078821072354913],[44.609858617186546,7.078856276348233],[44.61004301905632,7.078695176169276],[44.61066411808133,7.078163847327232],[44.61147523485124,7.0777821354568],[44.61168436333537,7.077603349462152],[44.61194906383753,7.077582646161318],[44.61203522980213,7.077646683901548],[44.61254275403917,7.07771809771657],[44.61275649257004,7.077476950362325],[44.612884568050504,7.076940760016441],[44.613288743421435,7.076535159721971],[44.613375244662166,7.076527280732989],[44.61336116306484,7.076401887461543],[44.61334674619138,7.076458381488919],[44.613451017066836,7.076434157788754],[44.61337105371058,7.076346818357706],[44.613320929929614,7.07638755440712]]','[ 44.601004142314196, 7.139863958582282 ]'),
	('[[45.177786,7.083372],[45.177913,7.083268],[45.178044,7.083159],[45.178199,7.083081],[45.178361,7.083018],[45.178477,7.082895],[45.178591,7.082727],[45.178753,7.082619],[45.1789,7.082514],[45.179071,7.082438],[45.179219,7.082347],[45.179408,7.082283],[45.179555,7.082232],[45.179709,7.082178],[45.17988,7.082138],[45.180032,7.082123],[45.179965,7.081954],[45.179794,7.081847],[45.179613,7.081837],[45.179442,7.081813],[45.179302,7.081776],[45.179147,7.081767],[45.178983,7.081805],[45.178973,7.081613],[45.179072,7.081462],[45.179168,7.081302],[45.179274,7.081145],[45.179379,7.081016],[45.179503,7.080876],[45.17962,7.080775],[45.179767,7.080731],[45.179905,7.080712],[45.179993,7.080565],[45.18011,7.080454],[45.180232,7.080372],[45.180365,7.08034],[45.180497,7.080269],[45.180521,7.080063],[45.180643,7.079972],[45.180735,7.079806],[45.180816,7.079643],[45.180923,7.079512],[45.18102,7.079377],[45.181114,7.079234],[45.181242,7.079153],[45.181377,7.079153],[45.181513,7.079161],[45.181642,7.079087],[45.181729,7.078928],[45.181823,7.078789],[45.18195,7.078664],[45.182043,7.07852],[45.182174,7.078446],[45.182314,7.078399],[45.182428,7.078282],[45.182498,7.078118],[45.182637,7.078194],[45.182706,7.078022],[45.182797,7.077876],[45.182932,7.077827],[45.182968,7.078025],[45.183052,7.078189],[45.183144,7.07833],[45.183251,7.078447],[45.183322,7.078284],[45.183375,7.078098],[45.183451,7.077939],[45.18353,7.078105],[45.183628,7.078248],[45.183728,7.078386],[45.183833,7.078506],[45.183951,7.078624],[45.184068,7.078728],[45.184202,7.078783],[45.184339,7.078848],[45.184438,7.078983],[45.184553,7.079116],[45.184664,7.079234],[45.184772,7.07935],[45.184888,7.079466],[45.184997,7.079585],[45.185116,7.079694],[45.185227,7.079831],[45.185318,7.079987],[45.18544,7.080074],[45.185556,7.080176],[45.185665,7.080294],[45.185801,7.080396],[45.185938,7.080447],[45.186072,7.080475],[45.186205,7.080438],[45.186342,7.08042],[45.186459,7.08032],[45.186563,7.080197],[45.186677,7.08009],[45.186803,7.080018],[45.186675,7.079931],[45.1866,7.079772],[45.186567,7.079574],[45.186616,7.07939],[45.186754,7.079401],[45.186816,7.079224],[45.186797,7.079024],[45.186755,7.078829],[45.186894,7.078815],[45.186982,7.07866],[45.187118,7.07869],[45.18722,7.07856],[45.187209,7.078366],[45.187345,7.07836],[45.187302,7.078173],[45.187265,7.077985],[45.187347,7.077818],[45.187309,7.077625],[45.187411,7.077766],[45.18749,7.077609],[45.18751,7.077406],[45.187645,7.077378],[45.187688,7.077191],[45.187706,7.076998],[45.187822,7.077102],[45.187958,7.077157],[45.188082,7.077035],[45.188103,7.076841],[45.188244,7.0768],[45.18838,7.076775],[45.188494,7.076663],[45.18858,7.076498],[45.188607,7.076307],[45.188668,7.076128],[45.188718,7.075937],[45.188852,7.075977],[45.188912,7.07616],[45.189032,7.076255],[45.189157,7.076338],[45.189286,7.07627],[45.189338,7.076089],[45.189371,7.075899],[45.189502,7.075948],[45.189633,7.076018],[45.189765,7.076064],[45.189819,7.075881],[45.189838,7.07569],[45.189826,7.075494],[45.189856,7.075302],[45.189981,7.075386],[45.190058,7.075548],[45.190128,7.075364],[45.190185,7.075184],[45.190302,7.07528],[45.190412,7.075408],[45.190543,7.075484],[45.190661,7.075587],[45.190782,7.075677],[45.190917,7.075714],[45.190892,7.075519],[45.191032,7.075506],[45.191157,7.075587],[45.191115,7.075398],[45.191014,7.075251],[45.190916,7.075108],[45.190838,7.074947],[45.19097,7.074902],[45.191085,7.0748],[45.191203,7.074897],[45.191333,7.07495],[45.191469,7.074935],[45.191613,7.07499],[45.191735,7.075075],[45.191877,7.075048],[45.192014,7.075058],[45.192151,7.075044],[45.192282,7.075094],[45.192416,7.075136],[45.192542,7.075207],[45.192677,7.075244],[45.192822,7.075254],[45.192955,7.07529],[45.193094,7.07531],[45.19323,7.075341],[45.193359,7.075421],[45.193491,7.075469],[45.193606,7.075571],[45.193735,7.075631],[45.193868,7.075669],[45.194005,7.075736],[45.194122,7.075834],[45.194218,7.075977],[45.194324,7.076105],[45.194411,7.076264],[45.194496,7.076444],[45.194594,7.076583],[45.194655,7.07676],[45.194695,7.076953],[45.194768,7.077119],[45.194887,7.077222],[45.194964,7.077386],[45.195067,7.077521],[45.195173,7.077666],[45.195287,7.077779],[45.195382,7.077921],[45.195479,7.078059],[45.19556,7.078219],[45.195629,7.078391],[45.195721,7.078536],[45.19584,7.078639],[45.195952,7.078751],[45.19607,7.078851],[45.196195,7.078937],[45.196261,7.078767],[45.196203,7.07858],[45.196201,7.078385],[45.196197,7.078185],[45.196232,7.077997],[45.19622,7.077804],[45.196211,7.077612],[45.196204,7.077418],[45.196342,7.077439],[45.196429,7.077277],[45.196427,7.077084],[45.196441,7.076888],[45.196424,7.076697],[45.196469,7.076515],[45.196494,7.076327],[45.19648,7.076137],[45.196534,7.075955],[45.196552,7.07576],[45.196625,7.075598],[45.196639,7.075403],[45.196633,7.075209],[45.196647,7.075015],[45.196784,7.07501],[45.196931,7.075053],[45.197021,7.075207],[45.197137,7.075313],[45.19725,7.075434],[45.197352,7.075564],[45.19745,7.075702],[45.197561,7.075831],[45.197616,7.076012],[45.197672,7.076189],[45.197711,7.076389],[45.197809,7.076523],[45.197851,7.076712],[45.197987,7.076707],[45.198057,7.076538],[45.198188,7.076493],[45.19829,7.076367],[45.198428,7.076377],[45.198557,7.076317],[45.198598,7.076134],[45.198735,7.076138],[45.198809,7.076299],[45.198912,7.076174],[45.199028,7.076273],[45.199162,7.076306],[45.19927,7.076428],[45.199408,7.0764],[45.199553,7.076434],[45.199696,7.076472],[45.199835,7.076491],[45.199967,7.076569],[45.200099,7.076528],[45.200233,7.076568],[45.200364,7.07649],[45.200499,7.076499],[45.200638,7.07653],[45.200774,7.076559],[45.200913,7.076581],[45.201046,7.076616],[45.201178,7.076674],[45.201304,7.076756],[45.201425,7.076842],[45.20156,7.076884],[45.201692,7.076935],[45.201818,7.077012],[45.201947,7.07707],[45.202083,7.07708],[45.202179,7.077223],[45.202317,7.07727],[45.202448,7.077315],[45.202506,7.077139],[45.202642,7.077172],[45.202769,7.077106],[45.202882,7.077219],[45.202982,7.077359],[45.203121,7.077322],[45.203248,7.077385],[45.203355,7.077507],[45.203491,7.077485],[45.203388,7.077354],[45.203531,7.07734]]','[ 45.1906585, 7.079086 ]');