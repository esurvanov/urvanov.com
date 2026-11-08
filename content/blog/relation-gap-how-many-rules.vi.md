---
title: Một trò chơi cần bao nhiêu luật: trò chơi bước-và-nâng cần hai luật, còn kế toán chỉ cần một dòng ghi — khoảng trống quan hệ
date: 2026-11-02
updated: 2026-11-08
description: Cách đếm số luật của một trò chơi vừa trung thực vừa nhanh, và liệu hai kết quả có thể khác nhau. Diễn giải bài báo của Bartholdi, Bridson, Mikhailov và Nicholson về khoảng trống quan hệ (arXiv 2610.23637): trò chơi có hai nước đi mà người chơi cần hai luật còn kế toán cần một dòng ghi, kèm sơ đồ, công thức và phép tính.
tags: nghiên cứu, toán học, lý thuyết nhóm, tô pô, AI trong toán học
category: research
layout: wide
math: true
mentions: relation gap, group presentation, relation module, Cayley graph, Newman's theorem, one-relator group, Wall's D2 problem, D2 complex, homology, GAP, greatest common divisor, Gruenberg
toc: video=Video | question=Câu hỏi | paper=Bài báo và tác giả | rules=Hai luật | why=Vì sao chọn trò chơi này | player=Người chơi | accountant=Kế toán | answer=Đáp án | friends=Các bạn | coins=Đồng xu | main=Kết luận | formal=Hình thức hóa | practice=Ứng dụng ở đâu | when=Ai và khi nào | faq=Câu hỏi | next=Đọc tiếp
---

Một trò chơi có hai nước đi, bước và nâng, cần hai luật nếu đếm trung thực như người chơi, và chỉ cần một dòng ghi nếu đếm nhanh như kế toán, người ghi luật thành các vòng kín và quên thứ tự các nước đi. Bốn nhà toán học đã giải quyết như vậy câu hỏi về <a href="/materials/glossary/relation-gap/">khoảng trống quan hệ (relation gap)</a> vào tháng 10 năm 2026, sau khi nó bỏ ngỏ từ 1976.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Video: cùng câu chuyện trong 7,5 phút">
  <b-why>Bài viết đi theo phim từng cảnh và đi vào chi tiết hơn. Dưới mỗi sơ đồ có liên kết tới đúng khoảnh khắc đó trong video.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/yPvbfDa_GCk" title="Một trò chơi cần bao nhiêu luật — bài báo arXiv 2610.23637 bằng lời giản dị" ratio="16/9"/>
  <b-cap>Bài báo: <a href="https://arxiv.org/abs/2610.23637" target="_blank" rel="noopener">Two-generator presentations with a relation gap</a>, arXiv 2610.23637, ngày 16 tháng 10 năm 2026. Trò chơi, bước, nâng, người chơi và kế toán là các hình ảnh để giải thích; trong bài báo chúng là nhóm, các phần tử sinh, số quan hệ ít nhất và số phần tử sinh ít nhất của mô-đun quan hệ. Không cần xem phim: mọi thứ trong đó được kể lại bên dưới.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Câu hỏi: một trò chơi có bao nhiêu luật, và có hai cách đếm không">
  <b-why>Các nhà toán học mô tả câu đố và phép đối xứng như những trò chơi: có nước đi và có luật. Một luật cho biết chuỗi nước đi nào đưa mọi thứ về đúng chỗ cũ.</b-why>

  Lấy khối Rubik làm ví dụ. **Nước đi** là các lần xoay mặt. Các nước đi ghép thành chuỗi: xoay một mặt, rồi mặt khác, rồi mặt thứ ba. Mỗi nước đi đều hoàn tác được bằng cách xoay mặt đó ngược lại. Toàn bộ tập các chuỗi như vậy các nhà toán học gọi là một <a href="/materials/glossary/math-group/">nhóm</a>, còn một tập nhỏ các nước đi mà từ đó dựng nên mọi nước đi khác gọi là tập <a href="/materials/glossary/generators/">phần tử sinh</a>. Một **luật** (các nhà toán học nói “<a href="/materials/glossary/group-relation/">quan hệ</a>”) là chuỗi không thay đổi gì: ví dụ bốn lần xoay liền nhau một mặt đưa khối về đúng chỗ cũ.

  Câu hỏi: **cần bao nhiêu luật để mô tả trọn vẹn trò chơi**, tức là để mọi điều còn lại đúng trong trò chơi đều suy ra từ các luật này? Danh sách càng ngắn thì mô tả càng đơn giản. Có hai cách đếm.

  <b-table>
    <table><thead>
    <tr><th>Cách đếm</th><th>Đếm thế nào</th><th>Trong bài báo</th></tr>
    </thead><tbody>
    <tr><td><b>Người chơi</b> — trung thực</td><td>luật là một lộ trình trên bản đồ trò chơi quay về điểm xuất phát; thứ tự các nước đi có ý nghĩa: “phải, lên” và “lên, phải” là hai lộ trình khác nhau</td><td>số quan hệ ít nhất, $d_F(R)$</td></tr>
    <tr><td><b>Kế toán</b> — nhanh</td><td>ghi mỗi luật vào sổ như một vòng kín; các dòng ghi cộng theo thứ tự tùy ý, thứ tự các nước đi không được nhớ</td><td>số phần tử sinh ít nhất của <a href="/materials/glossary/relation-module/">mô-đun quan hệ</a>, $d_{\mathbb{Z}G}(R^{ab})$</td></tr>
    </tbody></table>
  </b-table>

  <b-art names="relation-gap-how-many-rules/methods"/>
  <b-cap>Người chơi đi trên bản đồ và thứ tự nước đi có ý nghĩa; kế toán ghi số lần đi qua và thứ tự không có ý nghĩa.</b-cap>

  Kế toán không bao giờ cần nhiều dòng ghi hơn số luật của người chơi: mỗi luật của người chơi đơn giản trở thành một dòng ghi. Câu hỏi ngược lại: có thể có **ít** dòng ghi hơn số luật không? Suốt năm mươi năm không ai biết. Câu hỏi này gọi là **khoảng trống quan hệ**: nó xuất phát từ công trình của Karl Gruenberg năm 1976 và vào danh sách bài toán của Wall năm 1979 (bài toán B15). Trường hợp chỉ có một dòng ghi đặc biệt thú vị: liệu từ đó suy ra nhóm chỉ có một luật không? <a href="https://youtu.be/yPvbfDa_GCk?t=0" target="_blank" rel="noopener">▶ 0:00</a>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="Bài báo và tác giả: đáp án trong ba trang">
  <b-why>Bản thảo ngày 16 tháng 10 năm 2026: bốn nhà toán học từ Lyon và Geneva, Oxford, Saint Petersburg và Bonn.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Tác giả</th><th>Nơi công tác</th></tr>
    </thead><tbody>
    <tr><td>Laurent Bartholdi</td><td>Institut Camille Jordan, Lyon; University of Geneva</td></tr>
    <tr><td>Martin R. Bridson</td><td>Mathematical Institute, University of Oxford</td></tr>
    <tr><td>Roman Mikhailov</td><td>Saint Petersburg State University</td></tr>
    <tr><td>John Nicholson</td><td>Max Planck Institute for Mathematics, Bonn</td></tr>
    </tbody></table>
  </b-table>

  Kết quả trong một câu: trong trò chơi **có hai nước đi**, người chơi cần hai luật, còn kế toán chỉ cần một dòng ghi. Trong bài báo đây là Định lý A, được chứng minh trọn vẹn và bằng phương pháp sơ cấp. Kết quả thứ hai, Hệ quả B, nói về <a href="/materials/glossary/wall-d2-problem/">bài toán D2 của Wall</a>. Nó dựa vào bản thảo của OpenAI ngày 6 tháng 10 năm 2026 và có điều kiện; chi tiết hơn ở chương về ứng dụng. <a href="https://youtu.be/yPvbfDa_GCk?t=26" target="_blank" rel="noopener">▶ 0:26</a>

  Định lý A bằng công thức (với mọi $p, q \ge 2$ nguyên tố cùng nhau):

  $$G=\langle x,\,t \mid x^{pq},\ [x^{p},\ t\,x^{q}\,t^{-1}]\rangle$$

  <b-art names="relation-gap-how-many-rules/general"/>
  <b-cap>Trường hợp tổng quát: vòng tròn gồm pq điểm, nửa vòng là p bước, cái móc là q bước ở tầng trên; p và q không có ước chung.</b-cap>

  Đọc như sau: “trò chơi $G$ được dựng từ hai nước đi $x$ và $t$ và tuân theo hai luật.” Luật thứ nhất: lặp nước đi $x$ đúng $pq$ lần thì mọi thứ về chỗ cũ. Luật thứ hai: các nước đi $x^{p}$ và $t\,x^{q}\,t^{-1}$ có thể đổi chỗ cho nhau. Trò chơi không được mô tả bằng một luật ($d_F(R)=2$), nhưng mô-đun quan hệ của nó được sinh bởi một dòng ghi ($d_{\mathbb{Z}G}(R^{ab})=1$).

  Các tác giả nêu công khai vai trò của AI, trong mục “Declaration of AI usage”: ChatGPT (“6 Astra”, đúng như in) giúp tìm ra các nhóm của Định lý A, phần chứng minh và bản nháp đầu tiên của bản thảo; Claude (“Fable 5.1”) được hỏi ý kiến trong giai đoạn biên tập sau; các lập luận và văn bản đã được các tác giả kiểm tra kỹ và sửa đáng kể, và họ chịu trách nhiệm về bản thảo cuối.
</b-chapter>

<b-chapter id="rules" icon="boxes-route" title="Trò chơi: một bước, một cú nâng và hai luật">
  <b-why>Trò chơi có một quân cờ và một vòng tròn sáu điểm. Nước đi đầu tiên, **bước**, dời quân cờ một điểm dọc theo vòng tròn.</b-why>

  Sáu bước và quân cờ về lại chỗ cũ. Đó là **luật thứ nhất**. Trò chơi không dừng ở một vòng tròn: từ mỗi điểm của vòng tròn có một **cú nâng** riêng đưa quân cờ lên vòng tròn riêng của nó ở tầng trên, và nâng xuống đưa nó trở lại. Các vòng tròn và các cú nâng tạo thành **bản đồ trò chơi**. Các nhà toán học gọi bản đồ như vậy là <a href="/materials/glossary/cayley-graph/">đồ thị Cayley</a> của một nhóm, và cùng loại đồ thị nằm dưới <a href="/blog/rubik-cube-neural-network/">khối Rubik</a> và dưới <a href="/blog/longest-ring-arrangement/">vòng bi</a>: đỉnh là các vị trí, cạnh là các nước đi.

  <b-art names="relation-gap-how-many-rules/map"/>
  <b-cap>Bên dưới là vòng tròn của tầng 0, các số là các điểm. Mũi tên xanh dương là bước, các mũi tên xanh lá là cú nâng lên các vòng tròn của tầng 1. <a href="https://youtu.be/yPvbfDa_GCk?t=48" target="_blank" rel="noopener">▶ 0:48</a> và <a href="https://youtu.be/yPvbfDa_GCk?t=61" target="_blank" rel="noopener">▶ 1:01</a></b-cap>

  Bản đồ có **luật thứ hai**. **Nửa vòng** là ba bước liên tiếp. **Cái móc** là nâng lên, đi hai bước ở tầng trên rồi xuống. Lần xuống dẫn tới một vòng tròn khác, không phải vòng tròn lúc xuất phát. Luật nói: nửa vòng rồi cái móc cũng giống như cái móc rồi nửa vòng. Hai nước đi này có thể đổi chỗ cho nhau.

  <b-art names="relation-gap-how-many-rules/swap"/>
  <b-cap>Hai đường đi từ điểm xuất phát đến cùng một điểm. <a href="https://youtu.be/yPvbfDa_GCk?t=76" target="_blank" rel="noopener">▶ 1:16</a></b-cap>

  Các nhà toán học viết điều đó bằng chữ cái. Bước là $x$, nâng là $t$, nâng xuống là $t^{-1}$. Một chuỗi nước đi viết thành hàng, như một từ, và sự lặp lại là lũy thừa: $x^3$ là ba bước. Vậy nửa vòng là $x^3$, còn cái móc là $t\,x^2\,t^{-1}$: nâng lên, hai bước, xuống. Các luật trở thành:

  $$x^{6}=1 \qquad\text{và}\qquad [\,x^{3},\ t\,x^{2}\,t^{-1}\,]=1$$

  Ở đây 1 nghĩa là “không làm gì cả”. Dấu ngoặc vuông là <a href="/materials/glossary/commutator/">hoán tử</a>: $[u,v]=u\,v\,u^{-1}v^{-1}$. Nó bằng 1 đúng khi các nước đi $u$ và $v$ đổi chỗ được cho nhau: làm $u$, rồi $v$, rồi hoàn tác $u$ và $v$, và bạn về đúng điểm xuất phát.
  <b-art names="relation-gap-how-many-rules/commutator"/>
  <b-cap>Hoán tử: u, v, nghịch đảo của u, nghịch đảo của v. Nếu các nước đi đổi chỗ được thì bạn rơi đúng điểm xuất phát.</b-cap>

  Cả trò chơi gói gọn trong một dòng, một <a href="/materials/glossary/group-presentation/">biểu diễn nhóm</a>:

  $$G=\langle\, x,\ t \mid x^{6},\ [x^{3},\ t\,x^{2}\,t^{-1}]\,\rangle$$

  <b-art names="relation-gap-how-many-rules/present"/>
  <b-cap>Trò chơi trong một dòng: nước đi ở bên trái vạch, luật ở bên phải.</b-cap>

  Bên trái vạch là các chữ cái của nước đi, bên phải là các luật.
</b-chapter>

<b-chapter id="why" icon="search" title="Vì sao trò chơi chính xác là như vậy">
  <b-why>Mỗi chi tiết đều cần cho đáp án, không có chi tiết thừa. Ba chi tiết làm việc cho hai nhân vật của đáp án: hai chi tiết đầu cho người chơi, chi tiết thứ ba cho kế toán.</b-why>

  <b-art names="relation-gap-how-many-rules/three"/>
  <b-cap>Bên trái là ba chi tiết của trò chơi; bên phải là ai cần từng chi tiết. <a href="https://youtu.be/yPvbfDa_GCk?t=98" target="_blank" rel="noopener">▶ 1:38</a></b-cap>

  **Sáu bước là quân cờ về nhà.** Người chơi cần chi tiết này. Trò chơi có một nước đi mà lặp lại vài lần thì về điểm xuất phát. Trong toán học điều này gọi là xoắn (torsion). Với định lý Newman (xem chương về các bạn) đây là điều kiện then chốt.

  **Nửa vòng và cái móc đổi chỗ được cho nhau.** Người chơi cũng cần chi tiết này. Các nước đi đổi chỗ được cho nhau gọi là **bạn**. Nửa vòng có hai bạn: hai bước dọc theo cùng vòng tròn và cái móc. Hai bạn này không phải là bạn của nhau, và từ đó suy ra một luật không thể mô tả trò chơi.

  **Các số ba và hai.** Kế toán cần chi tiết này. Nửa vòng có ba bước, cái móc có hai bước ở tầng trên, và 3 với 2 không có ước chung. Nhờ vậy hai dòng ghi có thể gộp thành một.

  Trong bài báo, số bước của nửa vòng và của cái móc là một cặp số nguyên tố cùng nhau bất kỳ $p$ và $q$, đều không nhỏ hơn hai. Phim lấy cặp nhỏ nhất: $p=3$, $q=2$. Khi đó luật thứ nhất là $x^{pq}=x^{6}=1$, còn luật thứ hai nói rằng $x^{p}=x^{3}$ và cái móc $t\,x^{q}\,t^{-1}=t\,x^{2}\,t^{-1}$ giao hoán với nhau.
</b-chapter>

<b-chapter id="player" icon="bulb" title="Cách đếm của người chơi: hai luật, không ít hơn">
  <b-why>Người chơi viết một luật như một lộ trình trên bản đồ, và thứ tự các nước đi trong đó có ý nghĩa. Mục tiêu là danh sách ngắn nhất mà từ đó suy ra mọi luật khác của trò chơi.</b-why>

  “Suy ra” nghĩa là gì? Nếu $x^{6}=1$ đúng thì $x^{12}=1$ cũng đúng: mười hai bước là sáu bước rồi thêm sáu bước nữa. Luật như vậy không thêm gì vào danh sách, và người chơi gạch nó đi. Điều này đúng với mọi hệ quả: chừng nào một luật suy ra từ những luật đã viết thì nó là thừa. Sau khi gạch, danh sách còn hai luật: sáu bước đưa về chỗ cũ, và nửa vòng đổi chỗ với cái móc.

  <b-art names="relation-gap-how-many-rules/player"/>
  <b-cap>Trong bốn ứng viên, hai luật vào danh sách; các luật còn lại là hệ quả. <a href="https://youtu.be/yPvbfDa_GCk?t=124" target="_blank" rel="noopener">▶ 2:04</a></b-cap>

  Vì sao danh sách không thể chỉ có một luật? Nếu một trò chơi có một luật, định lý Newman nói rằng các bạn của một nước đi bất kỳ là bạn của nhau. Ở đây các bạn của nửa vòng, hai bước và cái móc, không phải bạn của nhau (chương “Các bạn” bên dưới), nên một luật là không đủ. Các nhà toán học viết điều này là $d_F(R)=2$: số phần tử sinh chuẩn tắc ít nhất của nhóm các luật là hai.
</b-chapter>

<b-chapter id="accountant" icon="bulb" title="Cách đếm của kế toán: một dòng ghi">
  <b-why>Kế toán ghi mỗi luật vào sổ như một vòng kín: lộ trình đã quay về điểm xuất phát. Các dòng ghi được cộng theo thứ tự tùy ý và dời đi khắp bản đồ.</b-why>

  Một dòng ghi hoạt động thế nào. Kế toán đi một lộ trình và đếm: mỗi đoạn của bản đồ được đi qua bao nhiêu lần theo chiều xuôi (cộng một) và chiều ngược (trừ một). Một vòng quanh một ô vuông cho cộng một ở mỗi cạnh. Hai lộ trình đi quanh cùng một ô vuông nhưng xuất phát khác nhau để lại **cùng một dòng ghi**: thứ tự và điểm xuất phát không được giữ. Vì vậy các dòng ghi cộng được theo thứ tự tùy ý, như các số trong sổ, và dời được tới bất kỳ chỗ nào trên bản đồ. Các nhà toán học gọi dòng ghi như vậy là <a href="/materials/glossary/group-homology/">đồng điều</a> của đồ thị, và toàn bộ các dòng ghi là mô-đun quan hệ.

  <b-art names="relation-gap-how-many-rules/loops"/>
  <b-cap>Hai vòng với điểm xuất phát khác nhau cho một dòng ghi: bảng đếm số lần đi qua các đoạn. <a href="https://youtu.be/yPvbfDa_GCk?t=144" target="_blank" rel="noopener">▶ 2:24</a></b-cap>

  Kế toán không bao giờ có nhiều dòng ghi hơn số luật của người chơi: mỗi luật của người chơi được ghi lại thành một vòng kín. Còn ít hơn thì sao? Các tác giả dựng một dòng ghi khéo $v$, một hỗn hợp của các dòng ghi của cả hai luật. Từ các bản sao của nó (dời quanh bản đồ rồi cộng lại), dòng ghi của luật thứ hai suy ra ngay, còn dòng ghi của luật thứ nhất suy ra sau ba thao tác. Vậy **một dòng ghi là đủ cho kế toán**: mọi dòng ghi khác đều ra từ $v$ bằng cách cộng và dời. Các nhà toán học viết điều này là $d_{\mathbb{Z}G}(R^{ab})=1$ và nói rằng mô-đun quan hệ là **xyclic**.

  <b-art names="relation-gap-how-many-rules/merge"/>
  <b-cap>Một dòng ghi khéo thay cho hai. Nó hoạt động vì 3 và 2 không có ước chung. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  Ở dạng tổng quát, dòng ghi là $R^{ab}=R/[R,R]$: toàn bộ các luật $R$ với thứ tự bị “quên” (chia cho các hoán tử), và hệ số lấy từ $\mathbb{Z}G$: các tổng nước đi với hệ số nguyên kiểu “bao nhiêu lần xuôi, bao nhiêu lần ngược, tại mọi điểm của bản đồ”.
</b-chapter>

<b-chapter id="answer" icon="flag" title="Đáp án: có, hai cách đếm có thể khác nhau">
  <b-why>Câu hỏi là: cách đếm nhanh của kế toán có thể cho ít luật hơn cách đếm trung thực của người chơi không? Có thể.</b-why>

  <b-art names="relation-gap-how-many-rules/counts"/>
  <b-cap>Người chơi: hai luật. Kế toán: một dòng ghi. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  Trong trò chơi “bước và nâng”, người chơi cần hai luật còn kế toán cần một dòng ghi. Điều đó khép lại một câu hỏi năm mươi năm tuổi. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a> Tiếp theo là hai lập luận: vì sao một luật không đủ cho người chơi và vì sao một dòng ghi là đủ cho kế toán.
</b-chapter>

<b-chapter id="friends" icon="shield-check" title="Vì sao một luật không đủ cho người chơi: các bạn không giao hoán">
  <b-why>Một nước đi gọi là bạn của nước đi đã cho nếu hai nước đi đổi chỗ được cho nhau. Nửa vòng có hai bạn.</b-why>

  Đó là hai bước dọc theo cùng vòng tròn và cái móc. Hai nước đi này không phải là bạn của nhau: không thể đổi thứ tự của chúng. Năm 1973 Newman chứng minh một định lý: nếu một trò chơi có **một** luật và có một nước đi quay về điểm xuất phát, như bước sau sáu lần lặp, thì các bạn của một nước đi bất kỳ là bạn của nhau. Bài báo phát biểu chặt hơn: mọi phần tử khác đơn vị của một nhóm một quan hệ có xoắn đều có <a href="/materials/glossary/centralizer/">tâm hóa tử</a> xyclic (tập mọi nước đi đổi chỗ được với nó), tức là gồm các lũy thừa của một nước đi. Trong trò chơi này các bạn của nửa vòng không phải bạn của nhau, nên một luật không thể mô tả nó.

  <b-art names="relation-gap-how-many-rules/friends"/>
  <b-cap>Các bạn của nửa vòng giao hoán với nó, nhưng không giao hoán với nhau. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a></b-cap>

  Bài báo kiểm tra thế nào: nửa vòng được co thành một điểm, và phần còn lại của trò chơi là tích tự do của nhóm xyclic ba phần tử và nhóm xyclic vô hạn, $C_3 * \mathbb{Z}$. Theo dạng chuẩn của tích tự do, $x^{2}$ và cái móc không đổi chỗ được ở đó, nên chúng cũng không giao hoán trong trò chơi gốc.

  <b-art names="relation-gap-how-many-rules/free"/>
  <b-cap>Nửa vòng được co thành một điểm: còn lại một tam giác và một đường thẳng vô hạn. Cùng nhau chúng tạo thành một cây mà hai đường đi không bao giờ gặp nhau.</b-cap>
</b-chapter>

<b-chapter id="coins" icon="shield-check" title="Vì sao một dòng ghi là đủ cho kế toán: ba và hai">
  <b-why>Ước chung lớn nhất của ba và hai là một, và điều đó cho phép gộp hai dòng ghi thành một.</b-why>

  Từ ba và hai có thể ra một: ba trừ hai. Như đồng xu 3 rúp và 2 rúp: đưa 3, nhận lại 2 tiền thối, còn lại 1 rúp. <a href="/materials/glossary/gcd/">Ước chung lớn nhất</a> của 3 và 2 là một, nên

  $$\gcd(3,2)=1=3-2$$

  Theo cùng nguyên tắc đó, các tác giả gộp hai dòng ghi thành một dòng mà từ đó khôi phục được cả hai. <a href="https://youtu.be/yPvbfDa_GCk?t=201" target="_blank" rel="noopener">▶ 3:21</a>

  <b-art names="relation-gap-how-many-rules/coins"/>
  <b-cap>1 = 3 − 2: vì thế hai dòng ghi gộp thành một. <a href="https://youtu.be/yPvbfDa_GCk?t=207" target="_blank" rel="noopener">▶ 3:27</a></b-cap>

  Phép tính cho $p=3$, $q=2$ là đại số phổ thông. Ký hiệu trong bài báo, trước hết bằng lời:

  <b-table>
    <table><thead>
    <tr><th>Ký hiệu</th><th>Là gì</th></tr>
    </thead><tbody>
    <tr><td>$a=x^{3}$</td><td>nửa vòng</td></tr>
    <tr><td>$b=t\,x^{2}\,t^{-1}$</td><td>cái móc</td></tr>
    <tr><td>$N_a=1+a$,&nbsp; $N_b=1+b+b^{2}$</td><td>tổng các lũy thừa của nửa vòng và của cái móc: “làm nửa vòng không hoặc một lần” và “làm cái móc không, một hoặc hai lần”</td></tr>
    <tr><td>$N_x=1+x+\dots+x^{5}$</td><td>dòng ghi của luật thứ nhất: đi hết vòng tròn, sáu lần dịch liên tiếp</td></tr>
    <tr><td>$u$</td><td>dòng ghi của luật thứ hai (từ ma trận Fox, công thức (1) của bài báo)</td></tr>
    <tr><td>$v$</td><td>dòng ghi khéo mà từ đó ra được cả hai</td></tr>
    </tbody></table>
  </b-table>

  Tiếp theo là công thức (3) và (4) của bài báo. Tính chất của các tổng:

  $$N_aN_x=2N_x,\qquad N_a\,u=(1-b)\,N_x,\qquad N_b\,u=(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f1"/>
  <b-cap>Công thức (3): tổng “giữ nguyên hoặc quay nửa vòng” cho vòng tròn trọng số hai; áp dụng vào dòng ghi của luật thứ hai thì ra vòng tròn trừ bản sao đã dịch của nó.</b-cap>

  Dòng ghi khéo là hỗn hợp của hai dòng ghi:

  $$v=N_x+(b+b^{2})\,u$$

  <b-art names="relation-gap-how-many-rules/f2"/>
  <b-cap>Công thức (4): dòng ghi khéo là vòng tròn cộng hai bản sao của dòng ghi của luật thứ hai, dịch theo cái móc.</b-cap>

  Nhân nó với $N_a$ và $N_b$:

  $$N_a\,v=(1+b)\,N_x,\qquad N_b\,v=N_bN_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f3"/>
  <b-cap>Nhân dòng ghi khéo với các tổng.</b-cap>

  Vì $b^{3}=1$, rút gọn ta được:

  $$(1-b+b^{2})\,N_a\,v=2N_x,\qquad (N_b-b\,N_a)\,v=N_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f4"/>
  <b-cap>Sau khi rút gọn: vòng tròn trọng số hai, và vòng tròn cộng hai vòng tròn được nâng lên.</b-cap>

  Nhân đẳng thức thứ nhất với $(a-1)\,t$ rồi trừ nó khỏi đẳng thức thứ hai. Dòng ghi của luật thứ nhất ra qua $v$:

  $$N_x=\bigl(N_b-b\,N_a-(a-1)\,t\,(1-b+b^{2})\,N_a\bigr)\,v$$

  <b-art names="relation-gap-how-many-rules/f5"/>
  <b-cap>Kết quả: cả hai dòng ghi đều ra từ v, nên một dòng ghi là đủ.</b-cap>

  Dòng ghi của luật thứ hai $u$ cũng biểu diễn được qua $v$ từ $v=N_x+(b+b^2)u$. Vậy toàn bộ mô-đun quan hệ được sinh bởi một phần tử duy nhất $v$. Các đẳng thức này đã được kiểm tra bằng tay khi chuẩn bị phim.
</b-chapter>

<b-chapter id="main" icon="flag" title="Kết luận">
  <b-why>Câu hỏi là: cách đếm nhanh của kế toán có thể cho ít luật hơn cách đếm trung thực của người chơi không? Có thể, và ví dụ là một trò chơi có hai nước đi.</b-why>

  <b-art names="relation-gap-how-many-rules/summary"/>
  <b-cap>Mạch lập luận: trò chơi, người chơi với hai luật, kế toán với một dòng ghi, khoảng trống “hai so với một”.</b-cap>

  <b-callout icon="shield-check">**Lưu ý.** Định lý A được chứng minh trọn vẹn và độc lập với OpenAI. Hệ quả B, một phản ví dụ cho bài toán D2 của Wall, dựa vào bản thảo của OpenAI ngày 6 tháng 10 năm 2026, và chính các tác giả gọi nó là có điều kiện. Bài báo chưa được kiểm chứng độc lập.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Hình thức hóa: cùng con đường bằng ngôn ngữ của bài báo">
  <b-why>Phần hai của phim: cùng các bước nhưng có công thức và từ vựng của các nhà toán học. Trước hết là bản đồ tương ứng, sau đó là bảng công thức, rồi phác thảo chứng minh.</b-why>

  <b-art names="relation-gap-how-many-rules/dict"/>
  <b-cap>Bên trái là các từ trong phim, bên phải là ký hiệu của chúng trong bài báo. <a href="https://youtu.be/yPvbfDa_GCk?t=252" target="_blank" rel="noopener">▶ 4:12</a></b-cap>

  <b-table>
    <table><thead>
    <tr><th>Trong phim</th><th>Trong bài báo</th><th>Cách hoạt động</th></tr>
    </thead><tbody>
    <tr><td>trò chơi</td><td>nhóm $G=F/R$</td><td>$F$ là nhóm tự do: mọi từ trong các chữ cái $x$, $t$ không có luật; $R$ là mọi thứ suy ra từ các luật (bao đóng chuẩn tắc)</td></tr>
    <tr><td>bước, nâng</td><td>các phần tử sinh $x$, $t$</td><td>nâng xuống là $t^{-1}$; một chuỗi nước đi được viết thành một từ</td></tr>
    <tr><td>luật thứ nhất</td><td>$x^{pq}=1$</td><td>với $p=3$, $q=2$: $x^{6}=1$, như sáu lần xoay $60^\circ$</td></tr>
    <tr><td>luật thứ hai</td><td>$[x^{p},\,t\,x^{q}\,t^{-1}]=1$</td><td>$[u,v]=u\,v\,u^{-1}v^{-1}$: phải-rồi-lên bằng lên-rồi-phải</td></tr>
    <tr><td>toàn bộ trò chơi</td><td>$G=\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$</td><td>Định lý A: $p,q\ge 2$ nguyên tố cùng nhau</td></tr>
    <tr><td>cách đếm của người chơi</td><td>$d_F(R)$</td><td>số phần tử sinh chuẩn tắc ít nhất của $R$; ở đây là 2</td></tr>
    <tr><td>cách đếm của kế toán</td><td>$d_{\mathbb{Z}G}(R^{ab})$</td><td>số phần tử sinh ít nhất của mô-đun quan hệ $R/[R,R]$; ở đây là 1</td></tr>
    <tr><td>vòng kín — dòng ghi</td><td>đồng điều bậc một của đồ thị Cayley</td><td>mô-đun quan hệ là ảnh của ánh xạ biên $\partial_2$, cho bởi ma trận Fox</td></tr>
    <tr><td>các bạn</td><td>tâm hóa tử</td><td>định lý Newman: trong nhóm một quan hệ có xoắn, các tâm hóa tử là xyclic</td></tr>
    <tr><td>các số 3 và 2</td><td>$p$ và $q$ nguyên tố cùng nhau</td><td>$\gcd(3,2)=1=3-2$</td></tr>
    </tbody></table>
  </b-table>

  Chứng minh Định lý A chiếm một trang rưỡi trong bài báo. Các bước:

  <b-steps top="14" round>
    <step t="Không phải một luật">Nhóm này không phải nhóm một luật: nửa vòng $a=x^{p}$ có cấp $q$, còn $x^{q}$ và cái móc $b$ đều giao hoán với nó nhưng không giao hoán với nhau. Vậy $d_F(R)=2$ (định lý Newman).</step>
    <step t="Hai dòng ghi">Mô-đun quan hệ là ảnh của ánh xạ biên của phức phủ. Ma trận Fox cho hai dòng ghi: $N_x$ và $u$.</step>
    <step t="Một dòng ghi">Với $p=3$, $q=2$ dựng $v=N_x+(b+b^{2})\,u$, rồi $N_x$, $u$ được biểu diễn qua $v$ (phép tính ở trên). Trường hợp tổng quát tương tự, với công thức cho $v$ cồng kềnh hơn.</step>
  </b-steps>

  Nhóm này có thể định nghĩa trong <a href="/materials/glossary/computer-algebra-system/">hệ đại số máy tính</a> GAP bằng hai dòng: <a href="https://youtu.be/yPvbfDa_GCk?t=389" target="_blank" rel="noopener">▶ 6:29</a>

  <b-codebox copy>
    F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;
    G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;
  </b-codebox>
  <b-cap>Nhóm tự do trên x và t chia cho hai quan hệ. Sau đó có thể làm việc với nhóm như một đối tượng bình thường.</b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Ứng dụng ở đâu">
  <b-why>Các ứng dụng trực tiếp của kết quả hiện còn nằm trong chính toán học; phần còn lại là phép tương tự với cùng một bài học: ước lượng nhanh về độ phức tạp có thể hóa ra thấp hơn độ phức tạp thật.</b-why>

  <b-art names="relation-gap-how-many-rules/uses"/>
  <b-cap>Trực tiếp: hệ đại số máy tính; có điều kiện: tô pô; theo phép tương tự: khối Rubik, dữ liệu, đặc tả.</b-cap>

  <b-table>
    <table><thead>
    <tr><th>Mối liên hệ</th><th>Ở đâu và có nghĩa gì</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">trực tiếp</b-tag></td><td><a href="/materials/glossary/computer-algebra-system/">hệ đại số máy tính</a> (GAP, Magma): nhóm được cho bằng nước đi và luật, và nay biết rằng một dòng ghi có thể là đủ ở chỗ có hai quan hệ</td></tr>
    <tr><td><b-tag kind="ok">trực tiếp, có điều kiện</b-tag></td><td>tô pô: chính các nhóm này cho hình dạng trong <a href="/materials/glossary/wall-d2-problem/">bài toán D2 của Wall</a>: một phức sáu ô (một điểm, hai cạnh, hai ô phẳng và một ô khối); nếu kết quả của OpenAI được xác nhận thì hình dạng này không rút gọn được về hai chiều</td></tr>
    <tr><td><b-tag kind="plain">tương tự</b-tag></td><td>khối Rubik và câu đố: nước đi và luật, ở đó cũng đếm “cần bao nhiêu luật” (<a href="/blog/rubik-cube-neural-network/">bài về khối Rubik</a>)</td></tr>
    <tr><td><b-tag kind="plain">tương tự</b-tag></td><td>phân tích dữ liệu: phép đếm tuyến tính nhanh các “lỗ hổng” trong hình dạng dữ liệu có thể đánh giá thấp độ phức tạp</td></tr>
    <tr><td><b-tag kind="plain">tương tự</b-tag></td><td>đặc tả phần mềm: tập luật ngắn nhất và ước lượng nhanh về số luật có thể khác nhau</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Bài học.** Một ước lượng tuyến tính nhanh về độ phức tạp có thể đánh giá thấp nó. Điều này nay đã được chứng minh trên một ví dụ có hai nước đi. <a href="https://youtu.be/yPvbfDa_GCk?t=401" target="_blank" rel="noopener">▶ 6:41</a></b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Ai và khi nào, điều gì đã được chứng minh">
  <b-steps top="14" round>
    <step t="1965">Wall nêu câu hỏi về các phức D2 (<a href="/materials/glossary/wall-d2-problem/">bài toán D2</a>)</step>
    <step t="1973">Newman: định lý về tâm hóa tử trong nhóm một quan hệ</step>
    <step t="1976">Gruenberg: câu hỏi về khoảng trống quan hệ</step>
    <step t="1979">Bài toán B15 trong danh sách của Wall</step>
    <step t="6.10.2026">Bản thảo của OpenAI về một phản ví dụ cho bài toán D2 của Wall</step>
    <step t="16.10.2026" hl>Bài báo: bốn tác giả, Định lý A được chứng minh trọn vẹn</step>
  </b-steps>

  Định lý A: với $p,q\ge 2$ nguyên tố cùng nhau, nhóm $\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$ không phải nhóm một quan hệ, nhưng mô-đun quan hệ của nó là xyclic; do đó $d_F(R)=2$ và $d_{\mathbb{Z}G}(R^{ab})=1$. Hệ quả B dựa vào kết quả của OpenAI, và chính các tác giả gọi nó là có điều kiện. Ví dụ là tối thiểu: sáu ô, ít nhất mà một phản ví dụ cho bài toán của Wall có thể có. <a href="https://youtu.be/yPvbfDa_GCk?t=420" target="_blank" rel="noopener">▶ 7:00</a>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Khoảng trống quan hệ (relation gap) là gì?">Tình huống khi số quan hệ ít nhất của một nhóm lớn hơn số phần tử sinh ít nhất của mô-đun quan hệ của nó. Câu hỏi liệu điều này có xảy ra được nêu năm 1976; bài báo năm 2026 cho thấy là có.</q>
    <q t="Mô-đun quan hệ là gì?">Toàn bộ hệ quả của các quan hệ của một nhóm, viết sao cho thứ tự viết không quan trọng: các vòng kín trên bản đồ trò chơi có thể cộng và dời đi. Trong bài báo đó là $R/[R,R]$ với nhóm tác động bằng phép liên hợp.</q>
    <q t="Người chơi khác kế toán ở đâu?">Người chơi đếm luật trung thực, như các lộ trình trên bản đồ mà thứ tự nước đi có ý nghĩa. Kế toán đếm các dòng ghi mà thứ tự nước đi không được nhớ. Người chơi ra hai, kế toán ra một.</q>
    <q t="Các bạn của một nước đi là gì?">Những nước đi đổi chỗ được với nước đi đã cho. Trong bài báo đó là tâm hóa tử của một phần tử. Định lý Newman nói rằng với một luật và một nước đi quay về điểm xuất phát, các bạn giao hoán với nhau.</q>
    <q t="Bài toán D2 của Wall đã được giải chưa?">Có điều kiện. Bài báo dựng một phức D2 gồm sáu ô, nhưng kết luận dựa vào bản thảo của OpenAI ngày 6 tháng 10 năm 2026, và các tác giả gọi Hệ quả B là có điều kiện. Định lý A, về khoảng trống quan hệ, không phụ thuộc vào bản thảo đó.</q>
    <q t="AI đóng vai trò gì?">Theo các tác giả, ChatGPT giúp tìm các nhóm và phần chứng minh và viết bản nháp đầu, còn Claude được hỏi ý kiến khi biên tập. Các tác giả tự kiểm tra và sửa các lập luận và văn bản, và chịu trách nhiệm về kết quả.</q>
    <q t="Có thể tự kiểm tra không?">Có: nhóm của Định lý A được định nghĩa trong GAP bằng hai dòng (mã ở trên), còn phép tính cho $p=3$, $q=2$ là đại số phổ thông, có trong chương về ba và hai.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2610.23637" k="Bài báo" t="arXiv 2610.23637" ext>Two-generator presentations with a relation gap</item>
    <item href="https://github.com/esurvanov/awesome-papers/tree/main/papers/2610.23637-relation-gap" k="Nguồn của phim" t="papers/2610.23637-relation-gap" ext>Hồ sơ, lời dẫn, các cảnh và kịch bản của phim trên GitHub</item>
    <item href="https://github.com/esurvanov/awesome-papers" k="Kho mã" t="awesome-papers" ext>Phim về các bài báo khoa học bằng lời giản dị: mã, quy tắc, kiểm tra</item>
    <item href="https://youtu.be/yPvbfDa_GCk" k="Video" t="Bản diễn giải trên YouTube" ext>Cùng câu chuyện trong 7,5 phút, với bản đồ trò chơi và công thức</item>
    <item href="/blog/longest-ring-arrangement/" k="Cùng một đồ thị Cayley" t="Vòng bi">Bản đồ các nước đi và cách sắp xếp rối nhất</item>
    <item href="/blog/rubik-cube-neural-network/" k="Cùng một đồ thị Cayley" t="Khối Rubik">Nước đi và luật ở nơi không thể vét cạn</item>
  </b-links>
</b-chapter>
<b-footer>Dữ kiện lấy từ bài báo của L. Bartholdi, M. R. Bridson, R. Mikhailov, J. Nicholson, arXiv 2610.23637 (Định lý A, Hệ quả B, các công thức (1)–(4), mục “Declaration of AI usage”). Phép tính cho p = 3, q = 2 được tính lại bằng tay khi chuẩn bị phim; bài báo chưa được kiểm chứng độc lập.</b-footer>
</b-post>
