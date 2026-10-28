'use strict';
(() => {
const faculties = [{"name":"醫學院","departments":["醫學系","臨床醫學系","外科學系","內科學系","病理學系"]},{"name":"藥學院","departments":["藥學系","臨床藥學系","藥物化學系","放射藥學系","製藥科技學系"]},{"name":"放射醫學院","departments":["核子醫學系","放射化學系","醫學影像學系","分子影像學系","放射生物學系"]},{"name":"生命科學院","departments":["分子生物學系","遺傳學系","免疫學系","癌症生物學系","生物資訊學系"]},{"name":"生物醫學工程學院","departments":["生物醫學工程學系","醫療器材工程學系","醫療機器人學系","神經工程學系"]},{"name":"健康科學院","departments":["護理學系","醫學檢驗科學系","物理治療學系","營養學系","臨床心理學系"]},{"name":"公共衛生學院","departments":["公共衛生學系","流行病學系","生物統計學系","全球衛生學系","健康政策學系"]},{"name":"牙醫學院","departments":["牙醫學系","口腔外科學系","齒顎矯正學系","口腔病理學系"]},{"name":"獸醫學院","departments":["獸醫學系","伴侶動物醫學系","野生動物醫學系","馬匹醫學系"]},{"name":"醫療資訊與人工智慧學院","departments":["醫療資訊學系","醫療人工智慧學系","健康資料科學系","醫療資安學系"]},{"name":"醫學人文與倫理學院","departments":["醫學倫理學系","醫學史學系","醫病溝通學系","醫學人文學系","生死學系"]},{"name":"醫療法律與政策學院","departments":["醫事法律學系","生物科技法律學系","醫療政策學系","法醫科學系"]}];

const facultyIcons = ['🩺','💊','☢️','🧬','⚙️','🫶','🌍','🦷','🐾','💻','📚','⚖️'];
const community = [
{id:'campus',name:'校園閒聊',icon:'💬',description:'上課以外，今天的阿爾特萊茵又發生了什麼？'},
{id:'courses',name:'選課與課業',icon:'📝',description:'跨院選修、課表救援、讀書夥伴與考季求生。'},
{id:'dorm',name:'宿舍日常',icon:'🏠',description:'室友、洗衣間，以及那個總是忘記拿走的烤吐司。'},
{id:'food',name:'萊茵吃什麼',icon:'🍜',description:'熱湯、咖啡與不踩雷的學生餐桌。'},
{id:'clubs',name:'社團與活動',icon:'🎸',description:'找到一起練團、運動、探險和發呆的同學。'},
{id:'heart',name:'心情與關係',icon:'🌷',description:'開心也好，疲倦也好，都可以在這裡慢慢說。'},
{id:'market',name:'二手交換',icon:'📦',description:'把用不到的課本、生活小物與好故事傳下去。'},
{id:'freshmen',name:'新生問問',icon:'🌱',description:'沒有太小的問題，只有還沒找到的答案。'},
{id:'night',name:'深夜研究室',icon:'🌙',description:'留給晚歸的研究生、文獻讀不完的人與午夜咖啡。'}
];
const boards = community.map(board => ({...board,kind:'community',faculty:null}));
faculties.forEach((faculty,index)=>{
  faculty.id='faculty-'+(index+1);
  faculty.icon=facultyIcons[index];
  boards.push({id:faculty.id,name:faculty.name+'綜合',icon:faculty.icon,description:'跨系交流、院內消息與'+faculty.name+'的共同日常。',kind:'faculty',faculty:faculty.name,facultyId:faculty.id});
  faculty.departments.forEach((name,departmentIndex)=>boards.push({id:'dept-'+(index+1)+'-'+(departmentIndex+1),name,icon:faculty.icon,description:faculty.name+'・課業經驗、研究方向與同系夥伴都在這裡。',kind:'department',faculty:faculty.name,facultyId:faculty.id}));
});
const boardMap = new Map(boards.map(board=>[board.id,board]));
const byName = name => boards.find(board=>board.name===name).id;
const people = ['林沐和','沈予辰','柯映彤','江宥晴','羅向澄','季以安','陳禹棠','周芷寧','傅知遠','夏禾','顧晨曦','蘇予白','何映川','葉星榆','唐以沫','梁思齊','程苡安','方暮青','游子衡','溫若棠','宋承澤','白可晴','鄭亦寧','邵予澄','莫予夏','趙言舟','許橙','路星冉','孟可安','黎書庭','莊庭恩','高以晴'];
const topics = [
['病例整理','基礎與臨床的銜接','模擬教學'],
['藥物機轉','藥物設計的思路','文獻閱讀'],
['分子影像','影像與訊號的連結','研究報告'],
['細胞與基因','實驗問題的形成','資料整理'],
['設計與原型','工程和醫療的溝通','跨院合作'],
['照護與評估','課程與實作的安排','小組報告'],
['群體健康','研究設計與資料判讀','議題討論'],
['口腔結構','基礎課程的銜接','模型與觀察'],
['動物照護','不同物種的學習重點','觀察紀錄'],
['程式與資料','臨床問題和模型的連結','專題分工'],
['生命與倫理','文本閱讀與論證','課堂討論'],
['案例與法規','不同立場的梳理','文獻整理']
];
const anchor = Date.parse('2026-10-28T14:00:00+08:00');
const seedPosts = [];
function addSeed(id,boardId,title,body,author,likes,tags,index,replies) {
  seedPosts.push({id,boardId,title,body,author,likes,tags,createdAt:anchor-index*3600000,featured:1000-index,affiliation:boardMap.get(boardId).faculty || 'RUMSA 學生',replies:replies.map((reply,i)=>({id:id+'-reply-'+i,author:reply[0],body:reply[1],createdAt:anchor-index*3600000+(i+1)*600000}))});
}
const featured = [
['library-window','campus','中央圖書館靠窗那排，下午四點真的會發光',
'今天本來只是去還一本書，結果在三樓靠窗坐到了天黑。\n\n夕陽會剛好落在那一排木桌上，連攤開的筆記都像加了濾鏡。旁邊有個同學睡得很安詳，我也沒忍心拉椅子。\n\n如果你最近也覺得課業有點太滿，推薦留一個下午給這裡。什麼都沒完成也沒關係。','林沐和',386,['圖書館','校園角落'],[['夏禾','三樓窗邊派報到。最喜歡那個剛好能看到廣場的位子。'],['葉星榆','你是不是坐在橡樹正對面的那扇窗？那裡看下雪也很好看。'],['沈予辰','本來要收藏讀書方法，最後收藏了一個發呆地點。']]],
['e9743-seats','courses','E9743 的座位到底怎麼選，才能同時看見投影跟活下去',
'第一次去上跨院選修，想說提早十分鐘應該很充裕，進去的瞬間發現自己還是太天真。\n\n前排看得清楚，但每次老師停下來都覺得下一秒會叫我；後排比較安心，但投影上的字開始像藝術作品。\n\n請問大家心中的黃金座位區是哪裡？下次我願意提早二十分鐘。','柯映彤',271,['E9743','選課'],[['周芷寧','中段靠走道，進可寫筆記，退可去下一堂課。'],['羅向澄','先看自己的課表。下堂如果在另一個學院，靠出口就是唯一答案。'],['白可晴','投影變藝術作品那句，我笑到差點把水喝到鼻子裡。']]],
['market-orchestra','clubs','管弦樂團在找冬季市集的合作夥伴，不會樂器也可以！',
'這次想把演出做得更像廣場上的一場相遇，而不是大家站著聽完就散場。\n\n我們在找對小攤位、燈飾、節目單設計或現場紀錄有興趣的同學。你不需要會拉琴，也不需要認識樂團的人。\n\n如果你的社團也有一個「好像有點麻煩但很想試試看」的點子，這篇就是在找你。','江宥晴',194,['冬季市集','社團'],[['溫若棠','古典文學會想做詩句小卡，可以一起討論嗎？'],['何映川','午夜咖啡社有熱飲企劃。這個組合是不是已經有畫面了。'],['江宥晴','可以！我先把大家的想法整理起來，社團窗口我們再慢慢對。']]],
['soup-ranking','food','學生餐廳的熱湯，值得擁有自己的排名',
'天氣一冷，我對學餐的評分標準就只剩下湯夠不夠熱。\n\n目前私心第一名是靠廣場那邊的蔬菜濃湯，配一個麵包就可以快樂地撐過下午。第二名留給每次味道都不太一樣、但永遠很努力的清湯。\n\n大家有冬天會特別想走去吃的一餐嗎？救救每天站在路口選不出來的人。','夏禾',342,['學餐','熱湯'],[['方暮青','醫院通道那邊的小店！湯碗大到像要把整個下午都裝進去。'],['梁思齊','濃湯派加一，不過麵包太晚去會沒有。'],['許橙','我投學餐阿姨多給的那一勺，情緒價值第一名。']]],
['laundry-note','dorm','給把洗衣間失物排成一排的同學：你很可愛',
'早上去洗衣服，發現不知道誰把單隻襪子全部夾在旁邊的繩子上，還貼了一張「等待另一半」的紙。\n\n雖然我的襪子沒有因此回家，但我在一個原本很普通的早上笑了。\n\n宿舍有時候真的很吵，有時候也真的很像一個住著很多陌生朋友的地方。','季以安',219,['宿舍','日常'],[['陳禹棠','請問第三隻灰色襪子是不是我的，它失蹤兩週了。'],['唐以沫','「等待另一半」比我的感情狀況還有希望。']]],
['pet-reading',byName('放射化學系'),'讀 PET 探針文獻時，大家怎麼整理一堆看起來都很像的縮寫？',
'最近開始讀分子探針相關的文獻，發現最常做的事情不是讀正文，而是往回翻縮寫第一次出現在哪裡。\n\n目前試著把「分子是什麼、量的是什麼、在哪一個步驟」各寫成一欄，再把圖和樣本流程連起來。比起把所有結論抄進去，好像稍微有用一點。\n\n想問同系或放射藥學的朋友，有沒有更順手的文獻筆記方式？','傅知遠',168,['文獻共讀','PET'],[['蘇予白','我會另外畫樣本流程，不然看到後面的圖真的很容易忘記正在比哪一組。'],['顧晨曦','先把每張圖想回答的問題寫一句話，再回去補方法，對我很有幫助。']]],
['first-winter','freshmen','第一次在阿爾特萊茵過冬，有什麼現在就該知道的小事？',
'九月剛來的時候一直覺得這座城的路很好走，這幾天起風後，開始理解學長姐為什麼對「穿過主廣場」有不同意見。\n\n想收集一些不是新生手冊會寫、但大家會默默告訴室友的小事。像哪裡能坐著等人、哪條路比較有遮蔽、下課後可以喝到熱飲的地方。\n\n先謝謝各位，我會努力變成明年能回答這篇的人。','路星冉',155,['新生','冬天'],[['葉星榆','圖書館入口那一側等人比較舒服，還可以順便把書還掉。'],['莫予夏','手套不要收在行李箱最底層，來自已經翻過一次整個房間的人。']]],
['not-late','heart','原來不是只有我，到了大學還在重新認識自己',
'以前覺得進到想讀的科系，就會自動知道之後想做什麼。\n\n結果讀得越多，反而越常發現自己還有很多不知道的事。有時候看同學把未來講得很清楚，會有一點慌，然後又假裝自己只是累了。\n\n今天和朋友聊完才知道，原來很多人也正在慢慢找路。寫在這裡，給剛好需要看到的同學：我們可以不用同一天想明白。','周芷寧',428,['心情','大學生活'],[['黎書庭','謝謝你寫這篇。最近正在為「好像走得比別人慢」煩惱。'],['高以晴','把今天過好也算一種很實際的方向吧。我最近是這樣提醒自己的。'],['宋承澤','有時候換一門課、認識一個人，想法就會變。慢慢來。']]],
['late-coffee','night','凌晨的研究室沒有靈感，但有同學留的半包餅乾',
'事情做不完，文獻也讀不完，今天的進度條像被固定住一樣。\n\n正準備收東西，看到桌邊有同學留了一張「記得吃點東西再回去」的便條，下面壓著半包餅乾。\n\n突然覺得，這個晚上雖然沒有什麼突破，也不算完全失敗。願大家今晚都能好好收工。','梁思齊',302,['研究生日常','深夜'],[['羅向澄','這比「你的資料跑完了」更像一句好消息。'],['莊庭恩','今天也在整理沒有整理完的表格。一起收工吧。']]],
['vet-horse',byName('馬匹醫學系'),'獸醫學院跟馬術社的交流，讓我多了一本觀察筆記',
'原本以為活動會一直圍繞騎乘，結果印象最深的，反而是大家怎麼看待馬匹的情緒和日常照護。\n\n把課本的名詞放回真實的互動裡，才發現自己以前的筆記寫得太像一份清單。回來之後，第一頁只寫了「先學會好好觀察」。\n\n有參加的同學嗎？好想知道大家記下了什麼。','溫若棠',133,['馬術社','學習紀錄'],[['江宥晴','我記得的是每個人的步調都慢了下來，這個改變很有感。'],['游子衡','一個平常很安靜的同學，在聊到馬的時候突然說了好多話。']]],
['ai-project',byName('醫療人工智慧學系'),'專題分工後才發現：把問題講清楚，比先開模型還難',
'我們這組一開始很興奮地討論了模型、工具和畫面，結果第一次跨院討論，連「誰會用這個結果」都回答得不太一致。\n\n這週重新把使用情境和資料來源畫出來，雖然看起來進度退後了，但至少大家開始在解同一個問題。\n\n有人也有這種專題走了一圈又回到起點的經驗嗎？','沈予辰',178,['專題','跨院合作'],[['葉星榆','我們也遇過，後來每次開會先寫「今天要回答的問題」，有比較不會飄走。'],['邵予澄','把問題說清楚不是退後，是終於找到起點。']]],
['ethics-seminar',byName('醫學倫理學系'),'今天討論課最有意思的，是大家沒有急著找標準答案',
'一開始我很想把每個立場整理成支持和反對，後來發現有些同學是在問「這個問題為什麼會被這樣問」。\n\n突然覺得跨院課很值得，因為同一段文字，臨床、法律和人文背景的人，看到的重點真的不一樣。\n\n分享給正在猶豫要不要選醫學人文課的同學：可以帶著問題進來，不一定要帶著答案出去。','唐以沫',117,['跨院選修','醫學人文'],[['方暮青','我最喜歡的是有人問完之後，整間教室安靜思考的那幾秒。'],['傅知遠','原本只想補學分，結果現在筆記比本系課還多。']]],
['castle-map','clubs','城堡探索社的新生小隊：我們這次想把路線畫成一本小誌',
'不追求走最多的地方，想挑一條開放參訪的路線，慢慢記下窗框、石階、門牌和一路上聽到的故事。\n\n目前小隊裡有會速寫的人、喜歡找史料的人，也有只想練習把照片拍清楚的人。還缺一位願意幫忙把大家的筆記排在一起的夥伴。\n\n如果你也覺得一座城值得被慢慢認識，歡迎先來聊聊。','方暮青',146,['城堡探索','社團'],[['夏禾','我不會速寫，但可以負責記錄每次迷路的故事。'],['方暮青','迷路的部分只限於核准導覽路線內，故事我們可以留很長的篇幅。']]],
['book-swap','market','交換一套整理過的課堂筆記，想換一本有你註記的書',
'整理書架時發現，自己留著的書常常不是最新的，而是翻開就能看到以前某個人的思考。\n\n想試試看比較慢的交換：我有一套重新整理過、適合搭配入門課閱讀的筆記，想換一本你願意放手、頁邊有寫字的書。\n\n不用珍貴，也不用全新。說說你為什麼想把它傳下去就好。','許橙',96,['二手交換','書'],[['程苡安','有一本我上學期讀的散文，頁邊大概一半是感想、一半是午餐清單。'],['許橙','午餐清單聽起來也是一種很真實的閱讀紀錄。']]],
['public-health',byName('公共衛生學系'),'公共衛生的小組報告，大家都怎麼避免做成資料大集合？',
'我們這組資料找了很多，投影片也越來越多，但試講的時候才發現，聽眾可能不知道我們到底想回答什麼。\n\n後來先把主題縮成一個問題，再把沒有幫助回答問題的圖先移到備用區。雖然刪得很心痛，但總算看得見一條線。\n\n想聽聽大家的小組報告整理方法，也想知道你們都是誰負責提醒大家不要再加頁。','陳禹棠',123,['小組報告','公衛'],[['莊庭恩','我們有一個人專門扮演第一次聽到這個題目的同學，超有用。'],['柯映彤','不要再加頁的人通常也是最後負責排版的人，眼神會越來越堅定。']]],
['bme-prototype',byName('生物醫學工程學系'),'原型做出來後，最常聽到的回饋居然是「按鈕在哪裡」',
'我們花了一週把資料流程和展示畫面接起來，信心滿滿請朋友試用。對方看了十秒，問了一句：所以我現在要按哪裡？\n\n當下很安靜，後來整組笑了出來。原來我們一直在說它能做什麼，卻沒有讓使用的人知道第一步怎麼開始。\n\n這篇留作紀念，也給還在改原型的大家一點陪伴。','邵予澄',141,['生醫工程','專題'],[['顧晨曦','每次找一個完全沒參與的人試一次，都會重新認識自己的介面。'],['溫若棠','朋友的十秒鐘，抵得上我們的三個小時簡報。']]]
];
featured.forEach((post,index)=>addSeed(post[0],post[1],post[2],post[3],post[4],post[5],post[6],index+1,post[7]));
const communityExtras = {
campus:[['你最喜歡哪一條從學院走回宿舍的路？','最近想試著不要每天都走同一條路。歡迎分享你會特別繞過去看一眼的街角、樹或窗。'],['今天在主廣場聽到一段練琴聲','本來趕著去上課，還是站著聽完了一小段。想把這個很普通、但讓心情變好的瞬間留在這裡。']],
courses:[['跨院課表怎麼排，才不會整天都在趕路？','想在本系課之外選一門人文課，但兩堂課之間的距離讓我有點猶豫。大家會怎麼安排移動和午餐時間？'],['期中讀書小組：想找能一起把問題說清楚的夥伴','不一定要同系，想每次各自帶一個卡住的概念來討論。能把問題問完，就算今天有進度。']],
dorm:[['宿舍公共廚房，大家最常做的一道菜是什麼？','想從只會煮麵慢慢升級。歡迎分享簡單的菜色靈感，我會負責把公共桌面收乾淨。'],['求一個不會每天早上找不到鑰匙的方法','我和房門鑰匙的關係目前很不穩定。已經試過固定放包包，結果連包包都換了位置。']],
food:[['圖書館附近適合一個人慢慢吃的午餐','不一定要很熱門，想找可以坐一下、把上午的腦袋放空的地方。大家有自己的私房角落嗎？'],['熱飲派集合：咖啡之外，你的冬天喝什麼？','最近想換一點不同的味道，看到同學端著肉桂味的熱飲經過，突然覺得冬天也有優點。']],
clubs:[['想認識新朋友，又怕第一次去社團很尷尬','有人也是一個人去社團活動的嗎？很想聽聽大家第一次走進排練室、球場或讀書會的故事。'],['社團小活動也可以很好玩：分享一個最近的快樂','不一定要盛大的演出或比賽。一起練完一段、終於記住大家的名字，也算。']],
heart:[['今天沒有很厲害，但有按時吃晚餐','最近學著把完成一件小事也算進今天的好消息。你今天的小小好消息是什麼？'],['和不同學院的朋友聊天，常常會重新喜歡這座城','大家煩惱的事情不太一樣，笑起來的時候又很像。有沒有一個朋友，讓你看到完全不同的校園？']],
market:[['二手書交換，想順便收集大家的讀書方法','比起書況，我更想知道這本書曾經怎麼被使用。可以分享你最有用的一種註記方式嗎？'],['宿舍小物交流：你帶來最實用的一樣東西','有些東西搬來前覺得不需要，住了一個月後卻每天都在用。歡迎交流心得，不用留聯絡資料。']],
freshmen:[['新生第一次去跨院講堂，會不會走錯門？','地圖看得懂，站到建築前面又覺得每扇門都很合理。想聽聽大家剛來時的迷路故事。'],['想找同樣還在慢慢認路的朋友','不急著把整座校園走完，只想從圖書館、學餐和回宿舍的路開始，一個地方一個地方記住。']],
night:[['文獻讀了三次，第四次才突然懂了一句話','前面三次並沒有白讀，只是理解到得比較慢。把今天這個很小的進展記下來。'],['收工前的儀式：大家怎麼讓腦袋離開工作？','我最近試著把明天第一件要做的事寫下來再關電腦，走回去的路上就比較不會一直重播。']]
};
boards.forEach((board,index)=>{
 const facultyIndex=board.facultyId ? faculties.findIndex(f=>f.id===board.facultyId) : 0;
 const topic=topics[Math.max(0,facultyIndex)];
 let items;
 if(board.kind==='community') items=communityExtras[board.id];
 else if(board.kind==='faculty') items=[
 ['來自'+board.name+'：想認識不同系的同學','同在一個學院，有時候課表卻像住在不同的時區。想開一串讓大家交換最近正在學什麼、喜歡哪一門課，以及下課最常走去哪裡。'],
 ['跨院選修筆記｜從'+topic[1]+'開始','最近對本系以外的課程有點好奇，想聽聽不同科系同學的經驗。你選過哪一門課，讓原本熟悉的問題突然有了新的角度？']
 ];
 else items=[
 ['有沒有'+board.name+'的同學，想一起整理'+topic[0]+'？','最近在整理'+board.name+'的課堂筆記，發現最難的不是寫得整齊，而是把'+topic[0]+'的概念連起來。\n\n想找同系的夥伴，偶爾在圖書館討論各自卡住的地方。不求一次讀完，只求每次真的帶走一個懂了的觀念。'],
 [board.name+'的第一學期，你最想早一點知道什麼？','如果能回到剛開始讀'+board.name+'的時候，你會想提醒自己什麼？\n\n我會先說：'+topic[2]+'可以早一點開始，也可以早一點開口問人。想收集一些同系同學的小經驗，讓後來的人少緊張一點。']
 ];
 items.forEach((item,j)=>{
  const author=people[(index*3+j*7)%people.length];
  const id='board-'+board.id+'-'+j;
  const createdAt=anchor-(30+index*3+j)*3600000;
  seedPosts.push({id,boardId:board.id,title:item[0],body:item[1],author,affiliation:board.faculty||'RUMSA 學生',likes:13+(index*17+j*23)%94,tags:[board.kind==='community'?'校園日常':'同系交流'],createdAt,featured:0,replies:[
   {id:id+'-r1',author:people[(index+11+j)%people.length],body:board.kind==='department'?'同系路過。'+topic[2]+'真的值得留時間，和別人聊過之後比較容易知道自己漏了什麼。':'我也有類似的感覺。很多看起來很小的事情，聊過之後就會比較有方向。',createdAt:createdAt+3600000},
   {id:id+'-r2',author:people[(index+19+j)%people.length],body:board.kind==='department'?'先收藏。一直想找'+board.name+'的同學聊這些，原來不是只有我在慢慢摸索。':'喜歡這種大家一起分享小經驗的討論，慢慢讀完真的會比較不緊張。',createdAt:createdAt+7200000}
  ]});
 });
});

/* APPLICATION */
const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const e = escapeHtml;
const storageKey = 'rumsa-forum-v1';
const emptyState = () => ({posts:[],replies:{},liked:[],saved:[],nickname:''});
function isComment(item) { return item && typeof item.id==='string' && typeof item.author==='string' && typeof item.body==='string' && Number.isFinite(item.createdAt); }
function readStorage() {
 try {
  const parsed=JSON.parse(localStorage.getItem(storageKey)||'null');
  if(!parsed || typeof parsed!=='object') return emptyState();
  const value=emptyState();
  value.posts=Array.isArray(parsed.posts)?parsed.posts.filter(post=>post && typeof post.id==='string' && boardMap.has(post.boardId) && typeof post.title==='string' && typeof post.body==='string' && typeof post.author==='string' && Number.isFinite(post.createdAt)).map(post=>({...post,replies:[],likes:0,tags:['我的貼文'],featured:0,local:true})):[];
  value.saved=Array.isArray(parsed.saved)?parsed.saved.filter(id=>typeof id==='string'):[];
  value.liked=Array.isArray(parsed.liked)?parsed.liked.filter(id=>typeof id==='string'):[];
  value.nickname=typeof parsed.nickname==='string'?parsed.nickname.slice(0,18):'';
  if(parsed.replies && typeof parsed.replies==='object') Object.entries(parsed.replies).forEach(([id,items])=>{if(Array.isArray(items)) value.replies[id]=items.filter(isComment);});
  return value;
 } catch { return emptyState(); }
}
let local=readStorage();
let pageLimit=12;
let toastTimer;
let searchTimer;
const content=$('#mainContent');
const allPosts=()=>[...local.posts,...seedPosts];
const repliesFor=post=>[...(post.replies||[]),...(local.replies[post.id]||[])];
const likesFor=post=>(post.likes||0)+(local.liked.includes(post.id)?1:0);
const routeUrl=params=>'#'+new URLSearchParams(params).toString();
const boardUrl=id=>routeUrl({board:id});
const postUrl=id=>routeUrl({post:id});
function readRoute() {
 const params=new URLSearchParams(location.hash.slice(1));
 return {view:params.get('view')||'home',boardId:boardMap.has(params.get('board'))?params.get('board'):null,postId:params.get('post'),query:(params.get('q')||'').slice(0,100).trim(),sort:params.get('sort')==='hot'?'hot':'latest'};
}
let route=readRoute();
function notify(message) {
 const toast=$('#toast');toast.textContent=message;toast.hidden=false;
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3800);
}
function persist() { try {localStorage.setItem(storageKey,JSON.stringify(local));return true;} catch {return false;} }
function storageMessage(ok,success) { notify(ok?success:'已在此頁顯示；瀏覽器目前無法儲存，關閉後可能遺失。'); }
function formatTime(time) {
 try {return new Intl.DateTimeFormat('zh-TW',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Taipei'}).format(new Date(time));}catch{return '';}
}
function avatar(name,size) {
 const index=Array.from(name).reduce((n,character)=>n+character.codePointAt(0),0)%5;
 return '<span class="avatar avatar-'+index+(size?' '+size:'')+'" aria-hidden="true">'+e(Array.from(name)[0]||'同')+'</span>';
}
function navLink(url,icon,label,active,count) {
 return '<a class="nav-link'+(active?' active':'')+'" href="'+e(url)+'"'+(active?' aria-current="page"':'')+'><span class="nav-icon" aria-hidden="true">'+icon+'</span><span>'+e(label)+'</span>'+(count!==undefined?'<small>'+count+'</small>':'')+'</a>';
}
function renderPrimaryNav() {
 const views=[['home','⌂','論壇首頁'],['hot','♨','熱門討論'],['latest','◷','最新貼文'],['boards','▦','逛看板'],['saved','♡','我的收藏'],['mine','✎','我的貼文']];
 $('#primaryNav').innerHTML=views.map(item=>navLink(routeUrl({view:item[0]}),item[1],item[2],!route.boardId&&!route.postId&&!route.query&&route.view===item[0],item[0]==='saved'?allPosts().filter(post=>local.saved.includes(post.id)).length:item[0]==='mine'?local.posts.length:undefined)).join('');
}
function renderSidebar() {
 renderPrimaryNav();
 const activePost=route.postId?allPosts().find(post=>post.id===route.postId):null;
 const activeBoard=route.boardId||(activePost&&activePost.boardId);
 $('#communityNav').innerHTML=community.map(board=>navLink(boardUrl(board.id),board.icon,board.name,activeBoard===board.id)).join('');
 $('#departmentCount').textContent=faculties.reduce((sum,faculty)=>sum+faculty.departments.length,0)+' 個系所';
 $('#facultyNav').innerHTML=faculties.map(faculty=>{
  const members=boards.filter(board=>board.facultyId===faculty.id);
  return '<details class="faculty-group" data-faculty="'+e(faculty.name)+'"'+(members.some(board=>board.id===activeBoard)?' open':'')+'><summary><span aria-hidden="true">'+faculty.icon+'</span>'+e(faculty.name)+'</summary>'+members.map(board=>'<a class="nav-link faculty-board'+(board.id===activeBoard?' active':'')+'" href="'+e(boardUrl(board.id))+'" data-name="'+e(board.name)+'"'+(board.id===activeBoard?' aria-current="page"':'')+'>'+e(board.kind==='faculty'?'學院綜合討論':board.name)+'</a>').join('')+'</details>';
 }).join('');
 applySidebarFilter();
}
function applySidebarFilter() {
 const query=$('#sidebarSearch').value.trim().toLocaleLowerCase();
 let visible=0;
 document.querySelectorAll('.faculty-group').forEach(group=>{
  const parentMatch=group.dataset.faculty.toLocaleLowerCase().includes(query);
  let count=0;
  group.querySelectorAll('.faculty-board').forEach(link=>{link.hidden=!!query&&!parentMatch&&!link.dataset.name.toLocaleLowerCase().includes(query);if(!link.hidden)count++;});
  group.hidden=count===0;
  if(query&&count)group.open=true;
  if(count)visible++;
 });
 $('#sidebarEmpty').hidden=visible!==0;
}
function renderRightRail() {
 const popular=['campus','courses','food','clubs','night'];
 $('#rightRail').innerHTML='<section class="rail-card"><p class="rail-kicker">THE CAMPUS IS TALKING</p><h2>大家都在逛</h2>'+popular.map(id=>{
  const board=boardMap.get(id);
  return '<a class="hot-board" href="'+e(boardUrl(id))+'"><span aria-hidden="true">'+board.icon+'</span><div><strong>'+e(board.name)+'</strong><small>'+allPosts().filter(post=>post.boardId===id).length+' 篇討論 · 歡迎路過</small></div></a>';
 }).join('')+'<div class="rail-divider"></div><a class="rail-link" href="#view=boards">逛逛全部 '+boards.length+' 個看板 →</a></section><section class="rail-card"><h2>最近的話題標籤</h2><div class="topic-chips">'+['E9743','冬季市集','圖書館','跨院選修','文獻共讀','專題','宿舍','社團'].map(tag=>'<a href="'+e(routeUrl({q:tag}))+'"># '+e(tag)+'</a>').join('')+'</div></section><section class="rail-card rail-memo"><h2>這裡不是教務處 ☁</h2><p>沒有人要求你的問題先整理成一份簡報。選課的猶豫、研究室的半包餅乾，或今天吃到的那碗熱湯，都可以聊。</p></section><p class="rail-footer">萊茵同學會 · 非官方學生論壇<br>虛構校園，真實一點的學生心情。<br>內建貼文與人物皆為創作。你的發文、回覆與收藏僅自己可見，保存在此瀏覽器。</p>';
}
function postActions(post) {
 const liked=local.liked.includes(post.id),saved=local.saved.includes(post.id);
 return '<button class="post-action like" type="button" data-action="like" data-post-id="'+e(post.id)+'" aria-label="'+(liked?'收回喜歡':'喜歡這篇貼文')+'" aria-pressed="'+liked+'"><span class="symbol" aria-hidden="true">'+(liked?'♥':'♡')+'</span><span>'+likesFor(post)+'</span></button><a class="post-action" href="'+e(postUrl(post.id))+'"><span class="symbol" aria-hidden="true">☏</span><span>'+repliesFor(post).length+' 則回覆</span></a>'+(post.tags&&post.tags[0]?'<span class="post-tag"># '+e(post.tags[0])+'</span>':'')+'<button class="post-action save-action" type="button" data-action="save" data-post-id="'+e(post.id)+'" aria-label="'+(saved?'取消收藏':'收藏這篇貼文')+'" aria-pressed="'+saved+'"><span class="symbol" aria-hidden="true">'+(saved?'▣':'▢')+'</span><span>'+(saved?'已收藏':'收藏')+'</span></button>';
}
function postCard(post) {
 const board=boardMap.get(post.boardId);
 return '<article class="post-card"><div class="post-topline">'+avatar(post.author)+'<span class="post-author">'+e(post.author)+'</span><a class="post-board" href="'+e(boardUrl(post.boardId))+'">'+e(board.name)+'</a><time class="post-time" datetime="'+e(new Date(post.createdAt).toISOString())+'">'+e(formatTime(post.createdAt))+'</time></div><a class="post-title" href="'+e(postUrl(post.id))+'"><h3>'+e(post.title)+'</h3></a><p class="post-excerpt">'+e(post.body.replace(/\n/g,' '))+'</p><div class="post-footer">'+postActions(post)+'</div></article>';
}
function filteredPosts() {
 let posts=allPosts();
 if(route.query) {
  const query=route.query.toLocaleLowerCase();
  posts=posts.filter(post=>[post.title,post.body,post.author,boardMap.get(post.boardId).name,...(post.tags||[])].join(' ').toLocaleLowerCase().includes(query));
 } else if(route.boardId)posts=posts.filter(post=>post.boardId===route.boardId);
 else if(route.view==='saved')posts=posts.filter(post=>local.saved.includes(post.id));
 else if(route.view==='mine')posts=local.posts.slice();
 const hot=route.view==='hot'||(route.boardId&&route.sort==='hot');
 const home=!route.query&&!route.boardId&&route.view==='home';
 return posts.sort((a,b)=>hot?likesFor(b)-likesFor(a)||b.createdAt-a.createdAt:home?Number(!!b.local)-Number(!!a.local)||(b.featured||0)-(a.featured||0)||b.createdAt-a.createdAt:b.createdAt-a.createdAt);
}
function hero() {
 return '<section class="community-hero"><p class="mini-label">HELLO, ALTRHEIN. HELLO, YOU.</p><h1>課本以外，<br>我們在這裡<span>集合。</span></h1><p class="hero-sub">一點課業，一點生活。還有那些，<br>只有同學才懂的小事。</p><div class="hero-meta"><span><strong>'+boards.length+'</strong> 個看板</span><span><strong>'+faculties.length+'</strong> 個學院</span><span><strong>'+allPosts().length+'</strong> 篇校園故事</span></div><span class="hero-sticker" aria-hidden="true">💬</span><span class="hero-bubble" aria-hidden="true">下課了，聊一下？ ☕</span></section>';
}
function emptyPanel(title,text,compose) {
 return '<section class="empty-panel"><span class="empty-icon" aria-hidden="true">☁</span><h2>'+e(title)+'</h2><p>'+e(text)+'</p>'+(compose?'<button class="write-button" type="button" data-action="compose">寫下第一篇</button>':'<a class="soft-button" href="#view=boards">去逛逛看板</a>')+'</section>';
}
function renderFeed() {
 const posts=filteredPosts();
 const board=route.boardId?boardMap.get(route.boardId):null;
 const home=!route.query&&!board&&route.view==='home';
 let heading='為你推薦',sub='從一篇貼文，認識另一種校園日常。',banner='';
 if(route.query){heading='搜尋「'+route.query+'」';sub='找到 '+posts.length+' 篇討論。';}
 else if(board){
  const faculty=board.facultyId?faculties.find(item=>item.id===board.facultyId):null;
  banner='<nav class="breadcrumbs" aria-label="看板位置"><a href="#view=boards">全部看板</a><span>／</span>'+(faculty?'<a href="'+e(boardUrl(faculty.id))+'">'+e(faculty.name)+'</a><span>／</span>':'')+'<span>'+e(board.name)+'</span></nav><section class="board-banner"><span class="board-emoji" aria-hidden="true">'+board.icon+'</span><h1>'+e(board.name)+'</h1><p>'+e(board.description)+'</p><div class="board-stats"><span>'+posts.length+' 篇討論</span><span>課業、研究與生活都可以聊</span></div></section>';
  heading='看板討論';sub='';
 } else if(route.view==='hot'){heading='熱門討論';sub='那些讓大家想多說幾句的事。';}
 else if(route.view==='latest'){heading='最新貼文';sub='依發文時間排序，看看校園的新聲音。';}
 else if(route.view==='saved'){heading='我的收藏';sub='把想再讀一次的討論，留在自己的書籤裡。';}
 else if(route.view==='mine'){heading='我的貼文';sub='你寫下的校園日常，僅保存在這個瀏覽器。';}
 const sortBase=board?{board:board.id}:{};
 const tabs=board?'<nav class="sort-tabs" aria-label="看板排序"><a href="'+e(routeUrl({...sortBase,sort:'latest'}))+'" class="'+(route.sort==='latest'?'active':'')+'">最新</a><a href="'+e(routeUrl({...sortBase,sort:'hot'}))+'" class="'+(route.sort==='hot'?'active':'')+'">熱門</a></nav>':!route.query&&['home','hot','latest'].includes(route.view)?'<nav class="sort-tabs" aria-label="貼文排序"><a href="#view=home" class="'+(route.view==='home'?'active':'')+'">推薦</a><a href="#view=hot" class="'+(route.view==='hot'?'active':'')+'">熱門</a><a href="#view=latest" class="'+(route.view==='latest'?'active':'')+'">最新</a></nav>':'';
 content.innerHTML=(home?hero():'')+banner+'<div class="feed-heading"><div>'+(home?'<h2>':'<h1>')+e(heading)+(home?'</h2>':'</h1>')+(sub?'<p>'+e(sub)+'</p>':'')+'</div>'+tabs+'</div>'+(posts.length?'<div class="post-list">'+posts.slice(0,pageLimit).map(postCard).join('')+'</div>'+(posts.length>pageLimit?'<button class="more-button" type="button" data-action="more">再看一些討論 · 已顯示 '+Math.min(pageLimit,posts.length)+' / '+posts.length+'</button>':'<p class="feed-end">先逛到這裡，等下一個想說話的人。☁</p>'):emptyPanel(route.query?'還沒有找到這個話題':route.view==='saved'?'你的收藏還空著':route.view==='mine'?'第一篇，從一件小事開始':'這個看板，等你先開個話題',route.query?'試著搜尋科系名稱、E9743、圖書館或同學的暱稱。':route.view==='saved'?'遇到喜歡的討論，點一下貼文下方的收藏，就能在這裡找到。':'寫個問題、分享今天的發現，或留一段想說的話。',!route.query&&route.view!=='saved'));
}
function directoryGroups(query) {
 const q=query.trim().toLocaleLowerCase();
 const communities=community.filter(board=>(board.name+' '+board.description).toLocaleLowerCase().includes(q));
 const facultyCards=faculties.map(faculty=>{
  const members=boards.filter(board=>board.facultyId===faculty.id&&(faculty.name.toLocaleLowerCase().includes(q)||board.name.toLocaleLowerCase().includes(q)));
  if(!members.length)return '';
  return '<article class="directory-card"><h3>'+faculty.icon+' '+e(faculty.name)+'</h3><div class="directory-boards">'+members.map(board=>'<a class="'+(board.kind==='faculty'?'board-general':'')+'" href="'+e(boardUrl(board.id))+'">'+e(board.kind==='faculty'?'學院綜合':board.name)+'</a>').join('')+'</div></article>';
 }).filter(Boolean);
 if(!communities.length&&!facultyCards.length)return '<p class="feed-note">沒有符合的看板，試試「放射」、「藥學」或「社團」。</p>';
 return (communities.length?'<section class="directory-section"><h2>生活，沒有標準答案</h2><div class="directory-grid directory-community">'+communities.map(board=>'<a class="directory-card" href="'+e(boardUrl(board.id))+'"><h3>'+board.icon+' '+e(board.name)+'</h3><p>'+e(board.description)+'</p></a>').join('')+'</div></section>':'')+(facultyCards.length?'<section class="directory-section"><h2>找到你的學院與系所</h2><div class="directory-grid">'+facultyCards.join('')+'</div></section>':'');
}
function renderDirectory() {
 content.innerHTML='<section class="directory-title"><p class="mini-label">FIND YOUR PEOPLE</p><h1>逛看板，找同溫層。</h1><p>'+boards.length+' 個看板，12 個學院，55 個系所。從熟悉的地方開始，也歡迎路過。</p></section><label><span class="sr-only">搜尋全部看板</span><input class="directory-search" id="directorySearch" type="search" placeholder="搜尋學院、科系或生活看板" autocomplete="off"></label><div id="directoryResults">'+directoryGroups('')+'</div>';
 $('#directorySearch').addEventListener('input',event=>{$('#directoryResults').innerHTML=directoryGroups(event.target.value);});
}
function renderThread() {
 const post=allPosts().find(item=>item.id===route.postId);
 if(!post){content.innerHTML=emptyPanel('這篇討論暫時找不到','可以回到看板看看，或從其他校園話題開始。',false);return;}
 const board=boardMap.get(post.boardId),replies=repliesFor(post);
 content.innerHTML='<nav class="breadcrumbs" aria-label="討論位置"><a href="'+e(boardUrl(board.id))+'">← 回到 '+e(board.name)+'</a></nav><article class="thread-sheet"><a class="post-board" href="'+e(boardUrl(board.id))+'">'+board.icon+' '+e(board.name)+'</a><h1>'+e(post.title)+'</h1><div class="thread-author">'+avatar(post.author)+'<div><strong>'+e(post.author)+'</strong><small>'+e(post.affiliation||'RUMSA 學生')+' · '+e(formatTime(post.createdAt))+(post.local?' · 我的貼文':'')+'</small></div></div><div class="thread-body">'+post.body.split(/\n\s*\n/).map(paragraph=>'<p>'+e(paragraph).replace(/\n/g,'<br>')+'</p>').join('')+'</div><div class="post-footer">'+postActions(post)+'</div><h2 class="comments-heading" id="replies">同學怎麼說 · '+replies.length+' 則回覆</h2><div id="commentList">'+replies.map((reply,index)=>'<article class="comment">'+avatar(reply.author)+'<div class="comment-content"><div class="comment-meta"><strong>'+e(reply.author)+'</strong><span class="post-tag">B'+(index+1)+'</span><small>'+e(formatTime(reply.createdAt))+'</small></div><p>'+e(reply.body)+'</p></div></article>').join('')+'</div><form id="replyForm" class="reply-form" data-post-id="'+e(post.id)+'"><h3>也想說幾句？</h3><label class="sr-only" for="replyNickname">回覆暱稱</label><input id="replyNickname" name="nickname" maxlength="18" value="'+e(local.nickname||'路過的同學')+'" placeholder="你的暱稱" required><label class="sr-only" for="replyBody">回覆內容</label><textarea id="replyBody" name="body" rows="3" maxlength="1200" placeholder="友善回覆，讓討論繼續下去……" required></textarea><p class="form-error" id="replyError" role="alert"></p><div class="reply-footer"><small>你的回覆僅自己可見，會保存在這個瀏覽器。</small><button class="write-button" type="submit">送出回覆</button></div></form></article>';
}
function closeSidebar() {document.body.classList.remove('sidebar-open');$('#sidebarShade').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false');$('#menuToggle').setAttribute('aria-label','開啟看板選單');}
function render() {
 route=readRoute();
 $('#postSearch').value=route.query;
 renderSidebar();
 renderRightRail();
 if(route.postId)renderThread();
 else if(route.view==='boards'&&!route.query&&!route.boardId)renderDirectory();
 else renderFeed();
 const board=route.boardId?boardMap.get(route.boardId):null;
 const post=route.postId?allPosts().find(item=>item.id===route.postId):null;
 document.title=(post?post.title:board?board.name:route.query?'搜尋 '+route.query:'萊茵同學會')+'｜RUMSA 學生論壇';
}
function openCompose() {
 $('#composeForm').reset();
 $('#composeBoard').value=route.boardId||'campus';
 $('#composeNickname').value=local.nickname||'';
 $('#composeError').textContent='';
 closeSidebar();
 $('#composeDialog').showModal();
 $('#composePostTitle').focus();
}
function refreshPostActions(postId) {
 const post=allPosts().find(item=>item.id===postId);
 document.querySelectorAll('.post-footer').forEach(footer=>{
  const button=footer.querySelector('[data-post-id]');
  if(button&&button.dataset.postId===postId)footer.innerHTML=postActions(post);
 });
 renderPrimaryNav();
}
document.addEventListener('click',event=>{
 const trigger=event.target.closest('[data-action]');
 if(!trigger)return;
 const action=trigger.dataset.action;
 if(action==='compose'){openCompose();return;}
 if(action==='more'){pageLimit+=12;renderFeed();return;}
 if(!['save','like'].includes(action))return;
 const postId=trigger.dataset.postId;
 if(!allPosts().some(post=>post.id===postId))return;
 const key=action==='save'?'saved':'liked';
 const exists=local[key].includes(postId);
 local[key]=exists?local[key].filter(id=>id!==postId):[...local[key],postId];
 const ok=persist();
 if(route.view==='saved'&&action==='save'&&!route.postId)render();
 else refreshPostActions(postId);
 if(!ok)storageMessage(false,'');
 else if(action==='save')notify(exists?'已取消收藏':'已加入你的收藏');
});
$('#composeForm').addEventListener('submit',event=>{
 event.preventDefault();
 const data=new FormData(event.target);
 const author=String(data.get('nickname')||'').trim(),title=String(data.get('title')||'').trim(),body=String(data.get('body')||'').trim(),boardId=String(data.get('board')||'');
 if(!author||!title||!body||!boardMap.has(boardId)){$('#composeError').textContent='請填寫暱稱、標題與內容，並選擇一個看板。';return;}
 const post={id:'my-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8),boardId,title:title.slice(0,80),body:body.slice(0,6000),author:author.slice(0,18),createdAt:Date.now(),affiliation:boardMap.get(boardId).faculty||'RUMSA 學生',likes:0,tags:['我的貼文'],replies:[],featured:0,local:true};
 local.posts.unshift(post);local.nickname=post.author;
 const ok=persist();
 $('#composeDialog').close();
 location.hash=postUrl(post.id).slice(1);
 storageMessage(ok,'貼文已儲存，這台裝置可繼續閱讀。');
});
content.addEventListener('submit',event=>{
 if(event.target.id!=='replyForm')return;
 event.preventDefault();
 const data=new FormData(event.target),author=String(data.get('nickname')||'').trim(),body=String(data.get('body')||'').trim(),postId=event.target.dataset.postId;
 if(!author||!body){$('#replyError').textContent='請填寫暱稱與回覆內容。';return;}
 const reply={id:'reply-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6),author:author.slice(0,18),body:body.slice(0,1200),createdAt:Date.now()};
 local.replies[postId]=[...(local.replies[postId]||[]),reply];local.nickname=reply.author;
 const ok=persist();
 renderThread();
 $('#replyBody').focus({preventScroll:true});
 storageMessage(ok,'回覆已儲存。');
});
$('#searchForm').addEventListener('submit',event=>{
 event.preventDefault();clearTimeout(searchTimer);
 const query=$('#postSearch').value.trim();
 location.hash=routeUrl(query?{q:query}:{view:'home'}).slice(1);
});
$('#postSearch').addEventListener('input',event=>{
 clearTimeout(searchTimer);
 const query=event.target.value.trim();
 searchTimer=setTimeout(()=>{pageLimit=12;history.replaceState(null,'',routeUrl(query?{q:query}:{view:'home'}));render();},180);
});
$('#sidebarSearch').addEventListener('input',applySidebarFilter);
$('#menuToggle').addEventListener('click',()=>{
 const open=document.body.classList.toggle('sidebar-open');
 $('#sidebarShade').hidden=!open;
 $('#menuToggle').setAttribute('aria-expanded',String(open));
 $('#menuToggle').setAttribute('aria-label',open?'關閉看板選單':'開啟看板選單');
});
$('#sidebarShade').addEventListener('click',closeSidebar);
$('#sidebar').addEventListener('click',event=>{if(event.target.closest('a'))closeSidebar();});
$('#closeCompose').addEventListener('click',()=>$('#composeDialog').close());
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSidebar();});
window.addEventListener('hashchange',()=>{clearTimeout(searchTimer);pageLimit=12;closeSidebar();render();window.scrollTo({top:0,behavior:'instant'});});
$('#composeBoard').innerHTML='<optgroup label="生活看板">'+community.map(board=>'<option value="'+e(board.id)+'">'+e(board.name)+'</option>').join('')+'</optgroup>'+faculties.map(faculty=>'<optgroup label="'+e(faculty.name)+'">'+boards.filter(board=>board.facultyId===faculty.id).map(board=>'<option value="'+e(board.id)+'">'+e(board.name)+'</option>').join('')+'</optgroup>').join('');
render();
})();
