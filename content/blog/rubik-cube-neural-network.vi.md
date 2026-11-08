---
title: AI giải Rubik vượt hơn 1.000 đội ở 4×4×4 và 5×5×5: học từ các lần xáo trộn, tìm kiếm bằng mặt trận rộng và giữ lời giải ngắn nhất của nhiều mạng
date: 2026-10-22
updated: 2026-11-08
description: Mạng nơ-ron CayleyPy giải Rubik bằng ít nước đi nhất như thế nào: khối Rubik có bao nhiêu tổ hợp, vì sao vét cạn là bất khả, la bàn học từ các lần xáo trộn ngẫu nhiên ra sao, và vì sao mặt trận tìm kiếm rộng cùng một đội mạng lại quan trọng. Kết quả trên 3×3×3, 4×4×4 và 5×5×5, giải thích bằng sơ đồ bài báo arXiv 2502.13266.
tags: AI, nghiên cứu, mạng nơ-ron, Rubik, AI giải Rubik, tìm đường
category: research
layout: wide
mentions: AI Rubik's Cube solver, neural network Rubik's Cube, Rubik's Cube combinations, God's number, 4x4 cube solver, 5x5 cube solver, CayleyPy, beam search, ResMLP, diffusion distance, Kaggle Santa 2023, DeepCubeA, EfficientCube, Cayley graph
toc: video=Video | question=Câu hỏi | count=Bao nhiêu tổ hợp | paper=Bài báo và tác giả | maze=Mê cung | walk=Lối đi | compass=La bàn | front=Mặt trận | squad=Đội | results=Kết quả | width=Độ rộng mặt trận | team=Vì sao cần đội | surprise=Bất ngờ | main=Tóm lại | formal=Dạng hình thức | practice=Dùng ở đâu | when=Ai và khi nào | faq=FAQ | next=Tiếp theo
---

AI giải Rubik hoạt động qua ba bước: mạng nơ-ron học từ các lần xáo trộn ngẫu nhiên xem còn bao nhiêu nước đi, tìm kiếm chùm (beam search) đi theo ước lượng đó qua hàng triệu vị trí cùng lúc, và nhiều mạng độc lập chạy song song, giữ lại lời giải ngắn nhất. Cách này đã vượt đội tốt nhất trong hơn 1.000 đội ở khối 4×4×4 và 5×5×5.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Video: cùng câu chuyện trong 12 phút">
  <b-why>Bài viết đi theo video từng cảnh và chi tiết hơn. Dưới mỗi sơ đồ có liên kết tới đúng thời điểm đó của video, được thuyết minh bằng tiếng Nga.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/bg7tVawVWMc" title="How to solve a Rubik's Cube in the fewest moves — the arXiv 2502.13266 paper in plain words" ratio="16/9"/>
  <b-cap>Bài báo: <a href="https://arxiv.org/abs/2502.13266" target="_blank" rel="noopener">A Machine Learning Approach That Beats Large Rubik's Cubes</a>, arXiv 2502.13266, ngày 18 tháng 2 năm 2025. Mê cung, la bàn, mặt trận và đội là các hình ảnh để giải thích; trong bài báo chúng là đồ thị Cayley, mạng nơ-ron, tìm kiếm chùm và tập hợp mạng (ensemble).</b-cap>
</b-chapter>

<b-chapter id="question" icon="cube" title="Câu hỏi: giải khối Rubik thì dễ, giải bằng ít nước đi nhất thì khó">
  <b-why>Ai cũng học được cách giải Rubik trong một buổi tối theo hướng dẫn. Hướng dẫn cho lời giải dài, thường 50–100 nước đi hoặc hơn. Lời giải ngắn nhất là một bài toán khác, và với các khối lớn chưa ai biết cách tìm nó.</b-why>

  Hai thuật ngữ cần dùng. **Nước đi** là xoay một mặt một phần tư vòng. **Vị trí** là cách các mặt đang được tô màu lúc này. Một lần xoay mặt đưa khối từ vị trí này sang vị trí khác. Câu hỏi của bài báo: làm sao đi từ một vị trí cho trước đến vị trí đã giải xong với ít nước đi nhất.

  <b-art names="rubik-cube-neural-network/turn"/>
  <b-cap>Trái: đã giải; giữa: sau một nước đi; phải: sau 20 nước đi ngẫu nhiên. <a href="https://youtu.be/bg7tVawVWMc?t=12" target="_blank" rel="noopener">▶ 0:12</a></b-cap>

  Sao không làm theo hướng dẫn rồi cắt bớt nước thừa? Hướng dẫn giải khối theo từng lớp, và mỗi bước tạm thời phá rồi sửa lại phần đã xong. Cách đó tốn nhiều nước hơn mức tối thiểu vài lần. Để tìm mức tối thiểu phải so sánh mọi đường đi có thể, mà số đường đi quá nhiều.
</b-chapter>

<b-chapter id="count" icon="grid" title="Khối Rubik có bao nhiêu tổ hợp">
  <b-why>Khối Rubik 3×3×3 thông thường có 43.252.003.274.489.856.000 tổ hợp — khoảng 43 tỷ tỷ, quá nhiều để kiểm tra từng cái. Vì vậy giải nó bằng ít nước đi nhất là khó.</b-why>

  Con số này đến từ các mảnh. Khối có 8 góc (mỗi góc 3 màu) và 12 cạnh (mỗi cạnh 2 màu); tâm các mặt không bao giờ di chuyển. Các góc có thể xếp theo 8! cách và xoay theo 3⁷ cách — độ xoay của góc cuối được các góc kia quyết định. Các cạnh xếp theo 12! cách và lật theo 2¹¹ cách. Một nửa số tổ hợp không thể xuất hiện trên khối thật (không thể đổi chỗ đúng hai mảnh mà không tháo khối), nên tích được chia đôi.

  <b-art names="rubik-cube-neural-network/pieces"/>
  <b-cap>Trái: chỉ các góc sáng; phải: chỉ các cạnh. <a href="https://youtu.be/bg7tVawVWMc?t=34" target="_blank" rel="noopener">▶ 0:34</a></b-cap>

  Với tốc độ kiểm tra một tỷ vị trí mỗi giây, tìm kiếm đầy đủ trên khối thông thường mất khoảng 1.370 năm: bắt đầu năm 2025, xong năm 3395.

  <b-art names="rubik-cube-neural-network/years"/>
  <b-cap>Tìm kiếm đầy đủ với một tỷ vị trí mỗi giây. <a href="https://youtu.be/bg7tVawVWMc?t=41" target="_blank" rel="noopener">▶ 0:41</a></b-cap>

  Khối lớn hơn có nhiều mảnh hơn, và con số tăng còn nhanh hơn. Khối 5×5×5 có nhiều vị trí hơn số nguyên tử trên Trái Đất.

  <b-art names="rubik-cube-neural-network/sizes"/>
  <b-cap>Độ dài thanh là số chữ số của số vị trí. <a href="https://youtu.be/bg7tVawVWMc?t=51" target="_blank" rel="noopener">▶ 0:51</a></b-cap>

  Với khối thông thường, mức tối thiểu đã biết. **Số của Chúa (God's number)** là số nước đi lớn nhất mà lời giải ngắn nhất của một vị trí bất kỳ có thể cần. Nó được tìm bằng tìm kiếm trên máy tính với các lối tắt nhờ đối xứng: 20 nước khi nửa vòng xoay tính là một nước (2010), và 26 nước khi chỉ tính xoay một phần tư (2014). Với 4×4×4 và 5×5×5 chưa có đáp án như vậy.

  <b-table>
    <table><thead>
    <tr><th>Khối</th><th class="bk-table-r">Số vị trí</th><th>Đã biết gì về đường đi ngắn nhất</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td class="bk-table-r">4,3·10¹⁹</td><td>số của Chúa: 20 nước (nửa vòng = 1 nước), 26 nước (chỉ xoay một phần tư)</td></tr>
    <tr><td>4×4×4</td><td class="bk-table-r">7,4·10⁴⁵</td><td>giả thuyết 48 nước, chưa chứng minh</td></tr>
    <tr><td>5×5×5</td><td class="bk-table-r">2,8·10⁷⁴</td><td>chưa biết</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Với khối 4×4×4 và 5×5×5, tìm kiếm đầy đủ là bất khả, và đường đi ngắn nhất chưa biết.</ex>
    <gen>Khi không gian trạng thái khổng lồ, đường đi ngắn nhất được tìm mà không liệt kê: bằng ước lượng khoảng cách và tìm kiếm thông minh. Chất lượng được kiểm tra trên các bài có đáp án đã biết hoặc đáp án tốt nhất đã biết.</gen>
    <do>Trước khi kết luận “AI đã giải xong bài toán”, hãy tìm hiểu nó được so sánh với cái gì: mức tối ưu đã chứng minh hay lời giải tốt nhất đã biết.</do>
  </b-finding>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="Bài báo, tác giả và cuộc thi">
  <b-why>Năm 2023, hơn một nghìn đội lập trình viên thi đấu trên Kaggle trong Santa 2023: ai giải được các câu đố, kể cả khối lớn, với tổng số nước đi ít nhất.</b-why>

  Kaggle là nền tảng nơi các công ty và nhà nghiên cứu đăng bài toán và các đội khắp thế giới thi nhau đưa ra lời giải. Santa 2023 có cách tính điểm đơn giản: tổng số nước đi trên tất cả các câu đố, càng thấp càng tốt. Các đáp án tốt nhất của cuộc thi trở thành mốc cho các khối lớn.

  Ngày 18 tháng 2 năm 2025, mười hai tác giả của dự án CayleyPy đăng bài báo “A Machine Learning Approach That Beats Large Rubik's Cubes”. Chương trình của họ vượt các đáp án tốt nhất của cuộc thi trên khối 4×4×4 và 5×5×5, và trở thành mạng nơ-ron đầu tiên giải được những khối lớn hơn khối thông thường.

  <b-art names="rubik-cube-neural-network/authors"/>
  <b-cap>Các tác giả theo thứ tự trong bài báo. Tác giả của blog này là một trong những đồng tác giả.</b-cap>
  <b-art names="rubik-cube-neural-network/race"/>
  <b-cap>Cuộc thi và kết quả: độ dài lời giải trung bình, số nước đi. <a href="https://youtu.be/bg7tVawVWMc?t=77" target="_blank" rel="noopener">▶ 1:17</a></b-cap>
</b-chapter>

<b-chapter id="maze" icon="boxes-route" title="Khối Rubik như mê cung các vị trí">
  <b-why>Hình ảnh trung tâm: mỗi vị trí là một căn phòng, mỗi nước đi là một cánh cửa sang phòng bên cạnh, khối đã giải là lối ra.</b-why>

  **Một căn phòng là một cách tô màu của khối.** Xoay một mặt là bạn sang phòng bên cạnh. Nó là phòng kề vì cách tô màu khác nhau đúng một lần xoay.

  <b-art names="rubik-cube-neural-network/rooms"/>
  <b-cap>Bên phải là cách tô màu đó khi mặt phải được xoay. <a href="https://youtu.be/bg7tVawVWMc?t=95" target="_blank" rel="noopener">▶ 1:35</a></b-cap>

  Mỗi phòng của khối thông thường có 12 cánh cửa: khối có 6 mặt, mỗi mặt xoay được theo chiều kim đồng hồ hoặc ngược lại.

  <b-art names="rubik-cube-neural-network/doors"/>
  <b-cap>Cả 12 phòng kề: sau mỗi cánh cửa là một cách tô màu khác. <a href="https://youtu.be/bg7tVawVWMc?t=105" target="_blank" rel="noopener">▶ 1:45</a></b-cap>

  Tất cả các phòng hợp lại thành mê cung — trong toán học là đồ thị Cayley của nhóm khối. **Luôn có đúng một lối ra: khối đã giải.** **Điểm xuất phát là khối đã xáo trộn của bạn**, vị trí cần giải. Giải khối bằng ít nước đi nhất nghĩa là đi từ điểm xuất phát đến lối ra qua ít cánh cửa nhất.

  Dưới đây là mê cung đồ chơi 40 phòng. Mê cung thật có 4,3·10¹⁹ phòng, mỗi phòng 12 cửa, nên không vẽ được; mê cung nhỏ cho thấy từng phần của chương trình hoạt động ra sao.

  <b-art names="rubik-cube-neural-network/map"/>
  <b-cap>Lối ra bên trái, điểm xuất phát bên phải, đường dày là tường. <a href="https://youtu.be/bg7tVawVWMc?t=132" target="_blank" rel="noopener">▶ 2:12</a></b-cap>

  Bây giờ nâng mỗi phòng lên độ cao bằng số nước đi đến lối ra. Ta được một địa hình: lối ra là điểm thấp nhất, và đường ngắn nhất từ phòng bất kỳ là đi xuống một cầu thang, mỗi bước thấp hơn một bậc. Nếu biết độ cao của mọi phòng thì giải rất dễ: luôn bước xuống. Không ai biết các độ cao — đó là điều mạng nơ-ron sẽ đoán.

  <b-art names="rubik-cube-neural-network/relief"/>
  <b-cap>Địa hình của cùng mê cung. <a href="https://youtu.be/bg7tVawVWMc?t=119" target="_blank" rel="noopener">▶ 1:59</a></b-cap>
</b-chapter>

<b-chapter id="walk" icon="flag" title="Lối đi từ lối ra">
  <b-why>Không ai có bản đồ mê cung: số phòng quá nhiều. Vì vậy các tác giả làm ngược lại.</b-why>

  Họ đứng ở lối ra và thực hiện các nước đi ngẫu nhiên — một lối đi, tức chỉ là xáo trộn khối đã giải. Sau mỗi nước đi họ ghi lại cách tô màu và số nước đã đi. Máy tính tạo ra hàng tỷ cặp “vị trí → số nước đi” như vậy ngay trong lúc huấn luyện: một lối đi gần như không tốn gì và không cần bản đồ.

  <b-art names="rubik-cube-neural-network/walks"/>
  <b-cap>Trái: một lối đi qua mê cung; phải: các bản ghi mà mạng học từ đó. <a href="https://youtu.be/bg7tVawVWMc?t=164" target="_blank" rel="noopener">▶ 2:44</a></b-cap>
  <b-kv-rows>
    <row k="Lối đi">các nước đi ngẫu nhiên từ khối đã giải, không bước ngược lại ngay</row>
    <row k="Độ dài">tối đa 26 nước với 3×3×3, 45 với 4×4×4, 65 với 5×5×5</row>
    <row k="Bản ghi">vị trí → số nước đã đi đến đó</row>
    <row k="Khối lượng">8 tỷ vị trí; 1 triệu vị trí mới trước mỗi vòng huấn luyện</row>
  </b-kv-rows>
</b-chapter>

<b-chapter id="compass" icon="search" title="La bàn: mạng đoán khoảng cách đến lối ra">
  <b-why>La bàn học từ các lối đi: nó nhìn một cách tô màu và đoán còn bao nhiêu nước đến lối ra — độ cao của phòng trên địa hình.</b-why>

  <b-art names="rubik-cube-neural-network/net"/>
  <b-cap>La bàn là một mạng nơ-ron bình thường: vào là cách tô màu, ra là một con số.</b-cap>

  La bàn sai, và sai theo hướng cao hơn: lối đi vòng vèo, nên tốn nhiều nước hơn đường ngắn nhất. Trong hình phác, một lối đi đến phòng sau 8 nước trong khi phòng đó thực ra chỉ cách 2 nước. Nhưng lối đi càng xa thì trung bình phòng càng xa lối ra, nên la bàn chỉ đúng hướng: số nhỏ hơn nghĩa là gần lối ra hơn. Các tác giả gọi số nước đi trung bình của lối đi đến một vị trí là khoảng cách khuếch tán (diffusion distance).

  <b-art names="rubik-cube-neural-network/loop"/>
  <b-cap>Vì sao la bàn ước lượng cao. <a href="https://youtu.be/bg7tVawVWMc?t=186" target="_blank" rel="noopener">▶ 3:06</a></b-cap>
  <b-io justify>
    <item k="Đầu vào">Vị trí của khối: danh sách các số cho biết mỗi nhãn trong 54 nhãn dán hiện ở đâu</item>
    <item k="Mạng">10 lớp, 4 triệu tham số; huấn luyện trên 8 tỷ vị trí từ các lối đi</item>
    <item k="Đầu ra">Ước lượng còn bao nhiêu nước đến khối đã giải</item>
  </b-io>

  La bàn là phần đầu tiên của chương trình các tác giả. Dưới đây toàn bộ chương trình được gọi là **bộ giải**: la bàn, mặt trận và đội.
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="Mặt trận: vì sao một đường đi là không đủ">
  <b-why>Đi theo một đường duy nhất, bất cứ nơi nào la bàn chỉ, thì chỉ một lỗi của la bàn là dẫn vào ngõ cụt.</b-why>

  Cách đơn giản để theo la bàn: từ phòng hiện tại bước vào phòng kề có số nhỏ hơn. Trong hình phác, các số trong phòng là ước lượng của một la bàn sai một hai nước. Đường đơn đi ba bước, vào một phòng mà la bàn đã sai, và đâm vào tường.

  <b-art names="rubik-cube-neural-network/deadend"/>
  <b-cap>Một đường đơn đi theo la bàn. <a href="https://youtu.be/bg7tVawVWMc?t=217" target="_blank" rel="noopener">▶ 3:37</a></b-cap>

  Vì vậy bộ giải di chuyển như một mặt trận — tìm kiếm chùm trong bài báo. Mặt trận là nhiều phòng cùng lúc. Ở mỗi bước bộ giải mở mọi cánh cửa từ mọi phòng của mặt trận, la bàn chấm điểm các phòng kề mới, và chỉ những phòng triển vọng nhất đi tiếp. Giữ lại bao nhiêu phòng là độ rộng của mặt trận; các tác giả lên tới 2²⁴ ≈ 16 triệu. Nếu la bàn sai ở một phòng, các phòng khác của mặt trận vẫn còn đó và đường đi không đứt.

  <b-art names="rubik-cube-neural-network/front"/>
  <b-cap>Cùng la bàn đó, mặt trận rộng 3. <a href="https://youtu.be/bg7tVawVWMc?t=249" target="_blank" rel="noopener">▶ 4:09</a></b-cap>
</b-chapter>

<b-chapter id="squad" icon="users-alt" title="Đội: nhiều la bàn và đáp án ngắn nhất">
  <b-why>Mỗi la bàn học từ các lối đi ngẫu nhiên của riêng nó, nên hai la bàn sai ở các phòng khác nhau.</b-why>

  Các tác giả lập một đội: nhiều mạng huấn luyện độc lập, mỗi mạng có mặt trận riêng. Mỗi mạng tự tìm kiếm, và đường đi ngắn nhất tìm được trở thành đáp án. Kiểm tra một đáp án rất rẻ — chỉ cần đếm số nước — nên thêm mạng không bao giờ gây hại; chúng chỉ thêm cơ hội có đường ngắn hơn.

  <b-art names="rubik-cube-neural-network/squad"/>
  <b-cap>Ba la bàn với các sai số khác nhau trên cùng mê cung. <a href="https://youtu.be/bg7tVawVWMc?t=276" target="_blank" rel="noopener">▶ 4:36</a></b-cap>
</b-chapter>

<b-chapter id="results" icon="trophy" title="Kết quả">
  <b-why>Ba khối, ba câu chuyện.</b-why>

  **Khối 3×3×3 thông thường.** Bộ giải tìm được đường đi ngắn nhất có thể trong 98 trên 100 trường hợp. Các mạng tốt nhất trước đó — DeepCubeA (2019) và EfficientCube (2023) — đạt 60 và 70.

  <b-dot-grid n="100" on="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97"></b-dot-grid>
  <b-cap>98 trên 100 bài — đường đi ngắn nhất (chính xác là 98,4% trên 1.000 vị trí từ công trình DeepCubeA). <a href="https://youtu.be/bg7tVawVWMc?t=283" target="_blank" rel="noopener">▶ 4:43</a></b-cap>

  **Khối 4×4×4.** Đường đi của bộ giải trung bình ngắn hơn các đội tốt nhất của cuộc thi 7 nước: 46,5 so với 53,5. Con số này thấp hơn giới hạn giả thuyết 48 nước.

  <b-share-bar kind="wide" label="Khối 4×4×4: độ dài lời giải trung bình">
    <seg w="46.51" color="accent" ink="#fff">bộ giải · 46,5</seg>
    <seg w="6.98" color="d-none">+7 ở các đội tốt nhất</seg>
  </b-share-bar>

  **Khối 5×5×5.** Bộ giải ngắn hơn các đội tốt nhất ở cả 19 bài của cuộc thi: trung bình 92,2 nước so với 96,6.

  <b-art names="rubik-cube-neural-network/checks"/>
  <b-cap>19 trên 19. <a href="https://youtu.be/bg7tVawVWMc?t=302" target="_blank" rel="noopener">▶ 5:02</a></b-cap>
  <b-table>
    <table><thead>
    <tr><th>Khối</th><th>Tập bài</th><th>Tốt nhất trước bài báo</th><th>CayleyPy</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td>1.000 vị trí từ công trình DeepCubeA</td><td>60,3% và 69,6% đường ngắn nhất (DeepCubeA, EfficientCube)</td><td><b>98,4%</b>, 26 la bàn</td></tr>
    <tr><td>4×4×4</td><td>43 vị trí, Kaggle Santa 2023</td><td>trung bình 53,49 nước</td><td><b>46,51</b> nước, 29 la bàn</td></tr>
    <tr><td>5×5×5</td><td>19 vị trí, Kaggle Santa 2023</td><td>96,58 nước</td><td><b>92,16</b> nước, 69 la bàn</td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Bảng I của bài báo.</b-cap>
</b-chapter>

<b-chapter id="width" icon="bulb" title="Vì sao: độ rộng của mặt trận">
  <b-why>Lỗi của la bàn ở một phòng được các phòng khác của mặt trận sửa, nên mặt trận càng rộng thì đường tìm được càng ngắn.</b-why>

  Trong hình phác, cùng một la bàn đâm vào ngõ cụt ở độ rộng 1, tìm được đường 11 nước ở độ rộng 2 và đường ngắn nhất, 9 nước, ở độ rộng 3. Các đường đi được tính bằng tìm kiếm chùm thật. Cái giá của độ rộng là thời gian: mặt trận rộng hơn kiểm tra nhiều phòng hơn.

  <b-art names="rubik-cube-neural-network/width"/>
  <b-cap>Cùng la bàn, độ rộng mặt trận khác nhau. <a href="https://youtu.be/bg7tVawVWMc?t=331" target="_blank" rel="noopener">▶ 5:31</a></b-cap>

  Trong bài báo, trên khối 4×4×4, mặt trận rộng gấp 256 lần rút đường đi từ 60 nước xuống 50, và mỗi lần nhân đôi độ rộng cắt bớt xấp xỉ cùng một số nước.

  <b-count-bars>
    <bar k="65 K" w="100%" color="c-none">60.2</bar>
    <bar k="262 K" w="94%" color="c-none">56.7</bar>
    <bar k="1 M" w="92%" color="c-none">55.3</bar>
    <bar k="4 M" w="88%" color="c-none">52.8</bar>
    <bar k="16 M" w="84%" color="accent">50.6</bar>
  </b-count-bars>
  <b-cap>Độ rộng mặt trận và đường đi trung bình trên khối 4×4×4, số nước. Bảng III của bài báo.</b-cap>
  <b-finding>
    <ex>Mỗi lần nhân đôi độ rộng cắt khỏi đường đi xấp xỉ cùng một số nước.</ex>
    <gen>Trong mọi tham số, độ rộng mặt trận ảnh hưởng đến kết quả nhiều nhất — hơn cả kích thước mạng hay lượng dữ liệu.</gen>
    <do>Khi ước lượng khoảng cách không chính xác, hãy đầu tư vào độ rộng tìm kiếm thay vì một ước lượng hoàn hảo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="users" title="Vì sao: đội">
  <b-why>Với khối 5×5×5 các tác giả huấn luyện 69 la bàn. Ở mỗi bài, la bàn có đường ngắn hơn thắng, và đường đi của 10 la bàn đã vào đáp án cuối cùng.</b-why>

  Ngay cả các la bàn yếu cũng hữu ích: mỗi la bàn thắng một hai bài khó. Cả đội cùng nhau tìm được đường ngắn hơn la bàn tốt nhất riêng lẻ tới 8 nước. Và chính la bàn 4×4×4 đầu tiên một mình đã vượt mọi đáp án tốt nhất của cuộc thi — mà vẫn không vào bộ cuối cùng: những la bàn khác hợp lại cho đường ngắn hơn.

  <b-dot-grid n="69" on="3,11,17,24,30,38,45,52,60,66"></b-dot-grid>
  <b-cap>69 la bàn cho 5×5×5; 10 la bàn có đường đi vào đáp án được tô sáng. Cụ thể những la bàn nào chỉ là hình phác; trong bài báo đây là hình 3. <a href="https://youtu.be/bg7tVawVWMc?t=362" target="_blank" rel="noopener">▶ 6:02</a></b-cap>
  <b-finding>
    <ex>Tập hợp 10 la bàn khác nhau cho đường ngắn hơn la bàn tốt nhất trong số đó tới 8 nước.</ex>
    <gen>Khi đáp án dễ kiểm tra, nhiều mô hình huấn luyện độc lập kèm việc chọn đáp án tốt nhất cho kết quả hơn việc mài giũa một mô hình.</gen>
    <do>Nếu kiểm tra đáp án rẻ, hãy chạy nhiều mô hình khác nhau và lấy kết quả tốt nhất.</do>
  </b-finding>
</b-chapter>

<b-chapter id="surprise" icon="bulb" title="Những điều bất ngờ">
  <b-why>Ba quan sát mà các tác giả gọi là bất ngờ.</b-why>

  <b-art names="rubik-cube-neural-network/surprises"/>
  <b-cap>Dữ liệu, kích thước mạng, thời gian. <a href="https://youtu.be/bg7tVawVWMc?t=397" target="_blank" rel="noopener">▶ 6:37</a></b-cap>
  <b-steps top="14" round>
    <step t="Nhiều dữ liệu hơn không tốt hơn">Vượt 8 tỷ vị trí, la bàn gần như không cải thiện: 4, 8 và 16 tỷ cho đường đi trung bình 55,4, 55,1 và 55,8 nước trên khối 4×4×4</step>
    <step t="La bàn nhỏ chính xác hơn">4 triệu tham số so với 14,7 triệu ở các mạng trước — nhỏ hơn gần bốn lần mà vẫn chính xác hơn; ngay cả mạng một lớp cũng đạt 90,4% đường ngắn nhất</step>
    <step t="Nhanh hơn">Huấn luyện mất 4 giờ 40 phút thay vì 86 giờ 25 phút; giải một khối trên cùng máy với cùng độ rộng mặt trận mất 10,9 giây so với 287,8 giây, nhanh hơn khoảng 26 lần</step>
  </b-steps>
</b-chapter>

<b-chapter id="main" icon="flag" title="Tóm lại">
  <b-why>Câu hỏi là: có thể tìm lời giải ngắn cho một khối khổng lồ mà không kiểm tra mọi vị trí không? Có thể.</b-why>

  Ba phần là đủ: la bàn học từ các lối đi ngẫu nhiên rời xa lối ra, mặt trận rộng bỏ qua lỗi của nó, và đội các la bàn khác nhau chọn đường ngắn nhất. Bộ giải không biết gì về bản thân khối Rubik — chỉ có phòng và cửa — nên nó cũng phù hợp với các mê cung khác.

  <b-step-chain>
    <node t="Lối đi">dữ liệu rẻ, không cần bản đồ</node>
    <node t="La bàn">ước lượng số nước đến lối ra</node>
    <node t="Mặt trận">bỏ qua lỗi của la bàn</node>
    <node t="Đội">ngắn nhất trong các đáp án</node>
  </b-step-chain>
  <b-callout icon="shield-check">**Lưu ý.** Đường đi ngắn nhất của các khối lớn chưa biết, nên bộ giải được so sánh với các lời giải tốt nhất đã biết, không phải với mức tối ưu.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Dạng hình thức: cùng con đường bằng ngôn ngữ của bài báo">
  <b-why>Phần hai của video: cùng các bước dưới dạng công thức.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Trong video</th><th>Trong bài báo</th><th>Hoạt động thế nào</th></tr>
    </thead><tbody>
    <tr><td>mê cung</td><td>đồ thị Cayley (Schreier) của nhóm khối</td><td>đỉnh là vị trí, cạnh là nước đi</td></tr>
    <tr><td>vị trí</td><td>hoán vị</td><td>(p(0), …, p(53)): mỗi nhãn trong 54 nhãn dán đã đi đâu; một nước đi dịch chuyển 20 nhãn</td></tr>
    <tr><td>lối đi</td><td>các cặp (vị trí, k)</td><td>k trung bình là khoảng cách khuếch tán; nó lớn hơn khoảng cách ngắn nhất</td></tr>
    <tr><td>la bàn</td><td>mạng nơ-ron ResMLP</td><td>10 lớp, 4 triệu tham số, cực tiểu hóa (ước lượng − k)²; 1 triệu vị trí mới trước mỗi vòng huấn luyện</td></tr>
    <tr><td>mặt trận</td><td>tìm kiếm chùm (beam search)</td><td>các phòng kề → loại trùng → ước lượng → W tốt nhất; W tới 2²⁴, tối đa 200 bước</td></tr>
    <tr><td>đội</td><td>các tác nhân (agent)</td><td>độ dài đáp án = min(L₁, …, L_A) trên các tác nhân</td></tr>
    </tbody></table>
  </b-table>
  <b-art names="rubik-cube-neural-network/perm"/>
  <b-cap>Một vị trí là một hoán vị: như bộ bài đã xáo — cùng các lá bài, thứ tự khác. Hiển thị 9 trong 54 nhãn dán. <a href="https://youtu.be/bg7tVawVWMc?t=495" target="_blank" rel="noopener">▶ 8:15</a></b-cap>
  <b-art names="rubik-cube-neural-network/beam"/>
  <b-cap>Một bước tìm kiếm chùm: như một vòng giải đấu, những người tốt nhất đi tiếp. <a href="https://youtu.be/bg7tVawVWMc?t=579" target="_blank" rel="noopener">▶ 9:39</a></b-cap>

  Tìm kiếm chùm trong vài dòng; các tác giả đã công bố mã PyTorch đầy đủ cùng bài báo.

  <b-codebox copy>
    def beam_search(start, model, W, steps=200):
        front = [start]
        for _ in range(steps):
            nbrs = unique(move(v) for v in front for move in MOVES)
            if SOLVED in nbrs: return True
            front = sorted(nbrs, key=model)[:W]   # W best by the compass
        return False
  </b-codebox>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Dùng ở đâu">
  <b-why>Bộ giải không biết rằng nó đang nhìn một khối Rubik: nó chỉ cần các vị trí, nước đi và đích. Vì vậy cùng cách làm phù hợp với mọi bài toán cần đi từ trạng thái này sang trạng thái khác theo đường ngắn nhất.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Mối liên hệ</th><th>Ở đâu</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">trực tiếp</b-tag></td><td>câu đố: khối mọi kích thước, cuộc thi Kaggle Santa</td></tr>
    <tr><td><b-tag kind="ok">trực tiếp</b-tag></td><td>đường đi ngắn nhất trong các đồ thị hoán vị khổng lồ nơi không thể liệt kê</td></tr>
    <tr><td><b-tag kind="plain">kế hoạch của tác giả</b-tag></td><td>các bài toán từ sinh học và lập trình</td></tr>
    <tr><td><b-tag kind="plain">tương tự</b-tag></td><td>lập kế hoạch: robot hoặc trò chơi cần đi từ trạng thái này sang trạng thái khác</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Bài học.** Khi không có bản đồ, hãy huấn luyện la bàn trên các lối đi ngẫu nhiên và tiến lên như một mặt trận rộng.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Ai và khi nào, điều gì đã được chứng minh">
  <b-steps top="14" round>
    <step t="1974">Ernő Rubik phát minh ra khối Rubik</step>
    <step t="2010">Đã chứng minh: mọi vị trí 3×3×3 giải được trong 20 nước khi nửa vòng xoay tính là một nước</step>
    <step t="2014">Đã chứng minh: trong 26 nước khi chỉ tính xoay một phần tư</step>
    <step t="2019">Mạng DeepCubeA của Đại học California, Irvine lần đầu giải khối thông thường mà không cần gợi ý của con người</step>
    <step t="2023">Cuộc thi Kaggle Santa: hơn 1.000 đội giải các khối lớn</step>
    <step t="2025" hl>Bài báo CayleyPy: mạng nơ-ron đầu tiên vượt mọi người ở 4×4×4 và 5×5×5</step>
  </b-steps>

  Đây là một thí nghiệm, không phải một chứng minh: các con số được đo trên các tập bài từ công trình trước và từ cuộc thi, còn đường đi ngắn nhất của các khối lớn chưa biết. Đường đi trung bình 46,5 nước trên khối 4×4×4 thấp hơn giới hạn giả thuyết 48 nước, nhưng bản thân giả thuyết chưa được chứng minh. Một số con số trong bài báo không khớp nhau: tỷ lệ đường ngắn nhất trên khối thông thường được ghi cả 98,4% lẫn 97,6%, và số mạng trong đội 4×4×4 đạt dưới 48 nước được ghi cả 29 lẫn 6.
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Mạng nơ-ron có giải được Rubik không?">Có. Mạng nơ-ron giải khối thông thường từ năm 2019 (DeepCubeA), và năm 2025 CayleyPy trở thành mạng nơ-ron đầu tiên giải được khối 4×4×4 và 5×5×5, với ít nước đi hơn các đội tốt nhất của cuộc thi.</q>
    <q t="Khối Rubik 3×3×3 có bao nhiêu tổ hợp?">43.252.003.274.489.856.000 — khoảng 4,3·10¹⁹. Khối 4×4×4 có khoảng 7,4·10⁴⁵, khối 5×5×5 khoảng 2,8·10⁷⁴.</q>
    <q t="Số nước đi ít nhất để giải một khối Rubik bất kỳ là bao nhiêu?">Khối 3×3×3 thông thường cần tối đa 20 nước khi nửa vòng xoay tính là một nước, và 26 khi chỉ tính xoay một phần tư. Với các khối lớn hơn, đáp án chính xác chưa biết.</q>
    <q t="CayleyPy khác DeepCubeA thế nào?">Mạng của nó nhỏ hơn gần bốn lần và huấn luyện nhanh hơn khoảng 18 lần, còn tìm kiếm chạy như một mặt trận rộng cùng một đội mạng. Trên khối thông thường, điều đó cho 98% đường ngắn nhất so với 60%.</q>
    <q t="Tôi có thể tự thử không?">Có: mã của các tác giả được mở, thư viện CayleyPy có trên GitHub (liên kết bên dưới).</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Tiếp theo">
  <b-links cols="3">
    <item href="https://arxiv.org/abs/2502.13266" k="Bài báo" t="arXiv 2502.13266" ext>A Machine Learning Approach That Beats Large Rubik's Cubes</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Mã" t="CayleyPy trên GitHub" ext>Thư viện tìm đường trong đồ thị hoán vị</item>
    <item href="https://youtu.be/bg7tVawVWMc" k="Video" t="Bài giảng trên YouTube" ext>Cùng câu chuyện trong 12 phút, có 3D và công thức (bằng tiếng Nga)</item>
  </b-links>
</b-chapter>
<b-footer>Các con số lấy từ bài báo của A. Chervov, K. Khoruzhii, …, E. Urvanov, A. Romanov, arXiv 2502.13266 (bảng I–III, hình 2–3). Mê cung được vẽ và các con số của nó chỉ là hình phác; các đường đi trong đó được tính bằng tìm kiếm chùm. Tác giả của blog này là một trong những đồng tác giả của bài báo.</b-footer>
</b-post>
