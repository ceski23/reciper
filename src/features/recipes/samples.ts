import { nanoid } from 'nanoid'
import type { Recipe } from 'features/recipes/types'

const pancakes: Recipe = {
	id: nanoid(),
	addedDate: new Date().getTime(),
	name: 'Oryginalne Amerykańskie Pancakes\'y',
	description:
		'Oryginalny przepis na amerykańskie placuszki zwane Pancakes\'ami . Delikatne, złociste, rozpływające się w ustach danie serwowane głównie na śniadanie. Pancakes\'y przeważają w wersji na słodko, jako deser, a w Polsce myślę, że nieraz wystąpią na stole jako smaczny i szybki obiad.',
	image: 'https://3.bp.blogspot.com/-TsSjrA-5opI/UzASiu3PGbI/AAAAAAAADZ0/0viA-MaSTiY/s1600/Pancakes+5.jpg',
	ingredients: [
		{ text: '135 g mąki pszennej' },
		{ text: '1 łyżeczka proszku do pieczenia' },
		{ text: '0.5 łyżeczki soli' },
		{ text: '2 łyżki cukru pudru' },
		{ text: '130 ml mleka' },
		{ text: '1 duże jajko (roztrzepane)' },
		{ text: '2 łyżki roztopionego masła + dodatkowo do smażenia' },
	],
	instructions: [
		{ text: 'Mąkę, proszek, cukier puder i sól mieszamy ze sobą.' },
		{ text: 'Jajko roztrzepujemy z mlekiem i dodajemy do reszty - łączymy składniki.' },
		{ text: 'Na końcu dodajemy roztopione masło - mieszamy do otrzymania gładkiej konsystencji.' },
		{
			text:
				'Placuszki smażymy na niewielkiej ilości masła na złoto-brązowy kolor z obu stron (pancakes\'y są gotowe do przewrócenia gdy na ich powierzchni pojawiają się pęcherzyki powietrza).',
		},
		{ text: 'Podajemy z syropem klonowym, miodem lub innym ulubionym dodatkiem.' },
	],
	prepTime: 20,
	url: 'http://www.slodkastrona.com/2014/03/oryginalne-amerykanskie-pancakesy.html',
	tags: ['śniadanie', 'na słodko'],
	servings: 10,
	calories: 1750,
	gallery: [
		'http://3.bp.blogspot.com/-U2wpP4JNpqs/UzASkzKWrpI/AAAAAAAADaU/fuM26RY2ZHQ/s1600/Pancakes+9.jpg',
		'http://1.bp.blogspot.com/-8pdwFWyxmT8/UzASktkXy3I/AAAAAAAADaM/NAtTMCOCQ-U/s1600/Pancakes+4.jpg',
		'http://2.bp.blogspot.com/-85f0--sGKrg/UzASjlR51pI/AAAAAAAADaE/xmNcV0cNk0Q/s1600/Pancakes+7.jpg',
		'http://3.bp.blogspot.com/-TsSjrA-5opI/UzASiu3PGbI/AAAAAAAADZ0/0viA-MaSTiY/s1600/Pancakes+5.jpg',
		'http://1.bp.blogspot.com/-RWL5IKKKw2k/UzASgKe8kzI/AAAAAAAADZQ/Ih7Th8pi45M/s1600/Pancakes+10.jpg',
		'http://1.bp.blogspot.com/-Idg6zLm12mo/UzAShgBRa9I/AAAAAAAADZk/AmMeivYEGTw/s1600/Pancakes+3.jpg',
		'http://1.bp.blogspot.com/-mnTCbOEMkZw/UzASgS4vWiI/AAAAAAAADZU/g1TZNL92cKk/s1600/Pancakes+12.jpg',
	],
	color: '#e57524',
}

const pierniczki: Recipe = {
	name: 'Pierniczki z lukrem',
	description: 'Tradycyjne pierniczki oblane pysznym lukrem – gwarantują niesamowicie świąteczną atmosferę.',
	image: 'https://aniastarmach.pl/content/uploads/2016/12/pierniczki-z-lukrem-16-1200x630.jpg',
	ingredients: [
		{
			text: '300 g mąki pszennej + mąka do podsypywania ciasta podczas wałkowania',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '150 ml miodu',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '50 g cukru pudru',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '50 g masła',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '1 jajko',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '1 łyżeczka proszku do pieczenia',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '1 łyżeczka cukru waniliowego',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '1 łyżka przyprawy do piernika (w składzie: cynamon, kardamon, imbir, anyż)',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '2 łyżki kandyzowanej skórki pomarańczowej',
			group: 'Pierniczki (ok. 40 sztuk)',
		},
		{
			text: '1 szklanka cukru pudru',
			group: 'Lukier',
		},
		{
			text: '1 łyżkę soku z cytryny',
			group: 'Lukier',
		},
	],
	instructions: [
		{
			text: 'Skórkę pomarańczową bardzo drobno posiekaj.',
		},
		{
			text:
				'Bardzo miękkie masło wymieszaj na stolnicy z mąką, cukrem pudrem i miodem. Dodaj proszek do pieczenia, jajko, przyprawy i posiekaną skórkę pomarańczową.',
		},
		{
			text: 'Ciasto szybko zagnieć i wsadź do lodówki na min. 30 minut.',
		},
		{
			text: 'Piekarnik rozgrzej do temperatury 180 stopni.',
		},
		{
			text:
				'Wyjmij ciasto z lodówki i rozwałkuj dość grubo – około 0,5 cm (im cieńsze ciasto, tym twardsze pierniczki). Żeby się nie przyklejało do stolnicy podsypuj je mąką. Wykrawaj pierniczki.',
		},
		{
			text: 'Układaj je na blasze wyłożonej papierem do pieczenia i piecz przez ok. 10-12 minut.',
		},
		{
			text:
				'Aby przygotować lukier, cukier puder przesiej do miski, dodaj sok z cytryny i wymieszaj. Całość podgrzej. Jeśli lukier będzie zbyt rzadki dodaj więcej cukru, jeśli zbyt gesty – soku. Gotowym lukrem dekoruj upieczone pierniczki.',
		},
	],
	prepTime: 40,
	tags: [
		'boże narodzenie',
		'ciastka',
		'cukier puder',
		'impreza',
		'lukier',
		'mąka',
		'miód',
		'na słodko',
		'pierniczki',
		'piernik',
		'podwieczorek',
		'przyjęcie',
		'przyprawa do piernika',
	],
	servings: 6,
	color: '#d6652c',
	gallery: [
		'https://aniastarmach.pl/content/uploads/2016/12/pierniczki-z-lukrem-16-1200x630.jpg',
	],
	id: nanoid(),
	url: 'https://aniastarmach.pl/przepis/pierniczki-z-lukrem/',
	addedDate: new Date().getTime(),
}

const kurczak: Recipe = {
	name: 'Kurczak z gorgonzolą',
	ingredients: [
		{
			text: '500 g filetu z indyka lub kurczaka',
		},
		{
			text: '80 g cieniutkiego boczku (paczkowanego) lub szynki parmeńskiej / prosciutto crudo / szynki suszonej',
		},
		{
			text: '180 ml śmietanki 30%',
		},
		{
			text: '90 g sera gorgonzola',
		},
		{
			text: '1/2 łyżki posiekanej bazylii lub natki pietruszki',
		},
		{
			text: 'kilka pomidorków koktajlowych',
		},
	],
	description:
		'Szybki, prosty i jednocześnie pyszny obiad, który u mnie występuje w wersji z filetem z indyka, ale tak samo dobrze wychodzi z kurczkiem. Filety zawinęłam w cieniutki boczek i podsmażyłam na patelni, potem włożyłam w sos ze śmietanki i gorgonzoli. Jeszcze tylko kilka pomidorków koktajlowych i rukola i danie jest gotowe. Jako dodatek sprawdzą się ziemniaki lub też makaron oraz prosta surówka z rukoli i pomidorków.',
	image: 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/kurczak-z-gorgonzola-00.jpg',
	instructions: [
		{
			text:
				'Mięso opłukać, osuszyć, przekroić poziomo na 2 cieńsze filety, następnie pokroić je na mniejszej wielkości kawałki. Rozbić tłuczkiem na grubość ok. 7 mm.',
		},
		{
			text: 'Doprawić solą (niezbyt dużo bo boczek/szynka jest słona) oraz pieprzem. Fileciki zawinąć w plasterki boczku lub szynki.',
		},
		{
			text:
				'Rozgrzać patelnię z łyżką oliwy, rozprowadzić ją po całej patelni. Obsmażyć mięso z dwóch stron na większym ogniu aż boczek się lekko podtopi i zrumieni.',
		},
		{
			text:
				'Zdjąć z patelni, wylać tłuszcz i wyczyścić patelnię ręcznikiem papierowym. Ustawić patelnię na średnim ogniu, wlać śmietankę, doprawić solą i pieprzem, dodać pokrojoną w kosteczkę gorgonzolę. Mieszając podgrzewać aż ser się roztopi.',
		},
		{
			text: 'Włożyć mięso i podgrzewać razem przez ok. 1 minutę, posypać bazylią lub natką.',
		},
	],
	rating: 4.88,
	color: '#cc2312',
	tags: [
		'hity kwestii smaku',
		'filety drobiowe',
		'szybki obiad',
		'dania główne',
		'kurczak',
		'indyk',
		'gorgonzola',
		'szynka parmeńska',
		'boczek',
	],
	servings: 3,
	gallery: [
		'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/filety_drobiowe_w_sosie_z_gorgonzoli_01.jpg',
		'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/filety_drobiowe_w_sosie_z_gorgonzoli_02.jpg',
	],
	id: nanoid(),
	url: 'https://www.kwestiasmaku.com/przepis/filety-drobiowe-w-sosie-z-gorgonzoli',
	addedDate: new Date().getTime(),
}

const ramen: Recipe = {
	name: 'Ramen',
	ingredients: [
		{
			text: '1 kg kości wieprzowych',
			group: 'Bulion',
		},
		{
			text: '1 kg kości drobiowych (np. korpus kurczaka, indyka)',
			group: 'Bulion',
		},
		{
			text: '4 cebulki szalotki',
			group: 'Bulion',
		},
		{
			text: '10 cm korzenia imbiru',
			group: 'Bulion',
		},
		{
			text: 'pół główki czosnku',
			group: 'Bulion',
		},
		{
			text: '2 marchewki',
			group: 'Bulion',
		},
		{
			text: 'wodorosty/algi konbu - płat o wymiarach ok. 7 x 20 cm',
			group: 'Bulion',
		},
		{
			text: 'ok. 80 - 100 ml japońskiego sosu sojowego (shoyu)',
			group: 'Bulion',
		},
		{
			text: '80 ml sake (wino ryżowe)',
			group: 'Bulion',
		},
		{
			text: 'wolno gotowana wieprzowina',
			group: 'Dodatki',
		},
		{
			text: '30 g suszonych grzybów shitake',
			group: 'Dodatki',
		},
		{
			text: '500 g świeżego makaronu ramen lub 220 g suszonego',
			group: 'Dodatki',
		},
		{
			text: 'dymka lub szczypiorek',
			group: 'Dodatki',
		},
		{
			text: '6 jajek',
			group: 'Dodatki',
		},
		{
			text: 'przyprawa shichimi togarashi',
			group: 'Dodatki',
		},
		{
			text: 'prasowane glony (sushi nori)',
			group: 'Dodatki',
		},
		{
			text: 'kiełki fasoli',
			group: 'Opcjonalnie',
		},
		{
			text: '200 g bok choy (pak choy)',
			group: 'Opcjonalnie',
		},
		{
			text: 'sezamowy olej chili',
			group: 'Opcjonalnie',
		},
	],
	description:
		'Japońska zupa z makaronem ramen, przygotowana od podstaw, na wywarze mięsnym, z dodatkiem sosu sojowego. Rodzajów ramenu jest bardzo wiele, w tej wersji głównym dodatkiem oprócz makaronu jest wolno gotowana wieprzowina, a także jajko.\nCzęść składników do zupy macie już pewnie w domu, ale niektóre prawdopodobnie trzeba będzie zamówić ze sklepu internetowego lub kupić w sklepie z żywnością orientalną. Z pewnością jednak możecie ugotować w domu swoją zupę ramen, nie gorszą niż w restauracji ;-) Więcej szczegółów na stronie z przepisem.\nJeszcze tylko krótko o odmianach ramenu: tonkotsu przygotowany jest na bazie bogatego wywaru z mięsa wieprzowego, shoyu to lekki bulion z sosem sojowym, miso - na bazie pasty z fermentowanej soi, shio - czysty bulion drobiowy.\nPrzy okazji polecam Wam moje inne przepisy na orientalne domowe zupy.',
	image: 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen_00.jpg',
	instructions: [
		{
			text:
				'Do dużego garnka włożyć kości wieprzowe i drobiowe. Całkowicie zalać je zimną wodą. Doprowadzić do wrzenia na dużym ogniu, następnie odcedzić, przepłukać zimną wodą i ponownie włożyć je do pustego garnka.',
			group: 'Bulion',
		},
		{
			text:
				'Cebulki obrać z zewnętrznych łusek, umyć. Cebulki i czosnek rozgnieść dla uwolnienia soku, dodać do garnka z mięsem. Dodać pokrojony na plastry imbir oraz obraną i pokrojoną na kilka części marchewkę. Dodać zgrubnie opłukany glon konbu i zalać całość zimną wodą (około 2 litry, do przykrycia składników).',
			group: 'Bulion',
		},
		{
			text:
				'Zagotować na dużym ogniu, wyjąć konbu (nie będzie potrzebne), usunąć z wierzchu szumowinę jeśli się pojawi. Ustawić garnek na minimalnym palniku, zmniejszyć ogień do minimum. Gotować pod uchyloną pokrywą przez około 6 godzin.',
			group: 'Bulion',
		},
		{
			text: 'Po przestudzeniu wyjąć kości i przecedzić bulion przez sito. Ostudzić i odstawić do lodówki.',
			group: 'Bulion',
		},
		{
			text:
				'Dzień wcześniej namoczyć grzyby shitake: zalać ciepłą wodą i odstawić do namoczenia. Namoczone grzyby shitake pokroić i podsmażyć na oleju aż będą miękkie. Ugotować jajka (5 min. od zagotowania wody). Przygotować mięso wieprzowe ( przepis ).',
			group: 'Dodatki',
		},
		{
			text:
				'Bulion przelać do garnka (wcześniej można zebrać część lub cały tłuszcz z wierzchu zimnej zupy). Dodać sos sojowy (na razie połowę ilości) oraz sake, zagotować, spróbować i w razie potrzeby dodawać stopniowo więcej sosu sojowego.',
			group: 'Przygotowanie ramen',
		},
		{
			text:
				'Do misek włożyć ugotowany makaron, wlać bulion, ułożyć grzyby shitake, plaster mięsa z pieczeni, przepołowione ugotowane jajko, kawałek prasowanych glonów, posypać dymką lub szczypiorkiem i doprawić przyprawą shichimi togarashi.',
			group: 'Przygotowanie ramen',
		},
		{
			text:
				'Można też dodać pak choi (pokrojony wzdłuż na szerokie paski i blanszowany), kiełki fasoli i skropić olejem sezamowym chili. Im więcej składników, tym lepiej ;) Ramen to zupa z dużą ilością makaronu i dodatków w porównaniu z samym bulionem.',
			group: 'Przygotowanie ramen',
		},
	],
	rating: 4.6,
	color: '#f4960c',
	tags: [
		'kuchnia japońska',
		'ramen',
		'zupy',
		'zupy orientalne',
		'wieprzowina',
		'pak choi',
		'miso',
		'imbir',
		'sake',
		'glony',
		'kiełki fasoli mung',
		'makaron chow mein',
	],
	servings: 6,
	gallery: [
		'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen_01.jpg',
	],
	id: nanoid(),
	url: 'https://www.kwestiasmaku.com/przepis/ramen-shoyu-z-wieprzowina',
	addedDate: new Date().getTime(),
}

export const sampleRecipes = [pancakes, pierniczki, kurczak, ramen]
