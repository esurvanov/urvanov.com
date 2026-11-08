---
title: Cách xếp bóng trên vòng nào gỡ lâu nhất: nhiều khả năng là “gương” — vét cạn, AI và giả thuyết về số cặp
date: 2026-10-22
updated: 2026-11-08
description: Cách xếp rối nhất của các quả bóng trên vòng có phép xoay và phép đổi chỗ cần bao nhiêu nước đi, và đường kính của đồ thị Cayley là gì. Vét cạn, mạng nơ-ron với beam search, cuộc thi Kaggle và các chứng minh cùng hội tụ về n(n−1)/2 — bài báo CayleyPy RL (arXiv 2502.18663) được giải thích bằng sơ đồ.
tags: AI, nghiên cứu, mạng nơ-ron, toán học, đồ thị Cayley, tìm đường
category: research
layout: wide
mentions: Cayley graph, Cayley graph diameter, God's number, symmetric group, permutations, LRX, OEIS A186783, n(n−1)/2 conjecture, CayleyPy, beam search, Bellman equation, GAP, Kaggle, TopSpin puzzle, Hungarian Rings
toc: video=Video | question=Câu hỏi | paper=Bài báo và tác giả | tower=Tòa tháp | mirror=Gương | pairs=Số cặp | gap=Hai mươi quả bóng | compass=La bàn | front=Tuyến đầu | hint=Gợi ý | contest=Cuộc thi | triples=Bộ ba | fork=Khoảng kẹp | main=Kết luận | formal=Dạng hình thức | practice=Dùng vào đâu | when=Ai và khi nào | faq=Câu hỏi | next=Đọc tiếp
---

Cách xếp gỡ lâu nhất nhiều khả năng là “gương” — vòng bóng được phản chiếu qua ô cửa đổi chỗ — và nó cần đúng bằng số cặp bóng nước đi: n(n−1)/2. Vét cạn đến 15 quả bóng, mạng nơ-ron với beam search đến 100 quả và một cuộc thi mở đến 200 quả đều cho cùng kết quả, còn các chứng minh kẹp đáp án vào một khoảng hẹp.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Video: cùng câu chuyện trong 11 phút">
  <b-why>Bài viết đi theo video từng cảnh, chi tiết hơn. Mỗi sơ đồ dẫn đến đúng khoảnh khắc của nó trong video.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/ecc2GvvZGvM" title="Cách xếp bóng nào gỡ lâu nhất — giải thích đơn giản arXiv 2502.18663 (bằng tiếng Nga)" ratio="16/9"/>
  <b-cap>Bài báo: <a href="https://arxiv.org/abs/2502.18663" target="_blank" rel="noopener">CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</a>, arXiv 2502.18663, ngày 25 tháng 2 năm 2025; Advances in Theoretical and Mathematical Physics, 2026. Vòng bóng, tầng, trần, la bàn và tuyến đầu là hình ảnh để giải thích; trong bài báo chúng là đồ thị Cayley, khoảng cách, đường kính, mạng nơ-ron và beam search. Video bằng tiếng Nga.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Câu hỏi: một vòng bóng, ba nước đi và cách xếp rối nhất">
  <b-why>Lấy một vòng bóng, mỗi quả có một số. Xáo trộn thế nào cũng luôn xếp lại được theo thứ tự. Câu hỏi là cách xếp nào gỡ lâu nhất và cần bao nhiêu nước đi.</b-why>

  Ba từ sẽ quan trọng. **Nước đi** là xoay vòng sang trái, xoay sang phải, hoặc đổi chỗ hai quả bóng trong **ô cửa** ở phía trên. **Cách xếp** là cách các quả bóng nằm quanh vòng. Không có nước đi nào khác: không thể nhặt quả bóng ở giữa, mọi thứ đều đi qua ô cửa.

  <b-art names="longest-ring-arrangement/moves"/>
  <b-cap>Trái: bóng theo thứ tự; giữa: sau khi xoay trái; phải: sau khi đổi chỗ trong ô cửa. <a href="https://youtu.be/ecc2GvvZGvM?t=8" target="_blank" rel="noopener">▶ 0:08</a></b-cap>

  Vì sao khó? Gỡ một cách xếp bất kỳ thì dễ: đưa quả bóng cần thiết đến ô cửa và đổi chỗ cho đến khi mọi thứ vào đúng vị trí. Nhưng làm vậy tốn rất nhiều nước đi. Muốn biết số nước tối thiểu phải so sánh mọi đường đi, mà vòng có 1·2·3·…·n cách xếp, một con số vượt xa mọi lũy thừa.

  Một bài toán liên quan — cùng vòng bóng đó, chỉ xoay một chiều cộng với phép đổi chỗ — được nhà điều khiển học Viktor Glushkov đặt ra năm 1968. Nó vẫn chưa được giải.
</b-chapter>

<b-chapter id="paper" icon="trophy" title="Bài báo, các tác giả và cuộc thi">
  <b-why>Câu hỏi này được 34 tác giả của dự án CayleyPy nghiên cứu — cùng nhóm đã dạy một mạng nơ-ron <a href="/blog/rubik-cube-neural-network/">giải khối Rubik 4×4×4 và 5×5×5</a>.</b-why>

  “CayleyPy RL” là bài báo thứ hai của loạt này: bài đầu cho thấy phương pháp trên các khối Rubik, bài này mở rộng sang các đồ thị Cayley tổng quát và thử trên vòng bóng. Bốn cách trả lời cùng một câu hỏi gặp nhau ở đây: vét cạn trên các vòng nhỏ, một chương trình đã huấn luyện cho các vòng lớn, một cuộc thi lập trình mở và các chứng minh chặt chẽ.

  <b-art names="longest-ring-arrangement/authors"/>
  <b-cap>34 tác giả theo thứ tự trong bài báo, tên viết như trong bài báo.</b-cap>

  Kaggle là nền tảng nơi các nhà nghiên cứu đăng bài toán và các nhóm khắp thế giới thi nhau đưa ra lời giải. Các tác giả đã mở ở đó ba thử thách về vòng bóng này và công bố mã để ai cũng có thể chạy và thử vượt qua.
</b-chapter>

<b-chapter id="tower" icon="boxes-route" title="Tòa tháp các cách xếp: tầng và trần">
  <b-why>Hãy vẽ tất cả các cách xếp cùng lúc. Năm quả bóng có 120 cách.</b-why>

  Đặt mỗi cách xếp lên một **tầng**: số nước đi từ thứ tự chuẩn theo đường ngắn nhất. Thứ tự chuẩn ở dưới cùng, ba cách xếp lân cận ở tầng một (mỗi nước đi một cách), rồi các tầng rộng ra và lại hẹp dần. Tầng cao nhất là **trần**: chừng đó nước đi là đủ cho mọi cách xếp. Với năm quả bóng, trần là tầng 10, và đúng một cách xếp nằm ở đó.

  <b-art names="longest-ring-arrangement/tower"/>
  <b-cap>Độ rộng thanh là số cách xếp ở tầng đó; tính bằng vét cạn. <a href="https://youtu.be/ecc2GvvZGvM?t=73" target="_blank" rel="noopener">▶ 1:13</a></b-cap>

  Trần chính là <a href="/blog/rubik-cube-neural-network/">God's number của khối Rubik</a>: số nước đi lớn nhất mà lời giải ngắn nhất có thể cần. Trong toán học đó là đường kính của đồ thị. Nếu biết tầng của mọi cách xếp, việc gỡ sẽ dễ: luôn bước xuống một tầng.
  <b-steps top="14" round>
    <step t="Tầng">Số nước đi từ cách xếp về thứ tự chuẩn theo đường ngắn nhất</step>
    <step t="Trần">Tầng cao nhất: đủ nước đi cho mọi cách xếp; God's number, đường kính đồ thị</step>
    <step t="Câu hỏi">Ai ở trên trần và trần cao bao nhiêu với số bóng bất kỳ</step>
  </b-steps>
</b-chapter>

<b-chapter id="mirror" icon="search" title="Ai ở trên trần: gương">
  <b-why>Các tác giả đã chạy vét cạn trên mọi cách xếp của các vòng đến 15 quả bóng. Với 15 quả, đó là hơn một nghìn tỷ cách xếp và vài ngày trên một cụm máy.</b-why>

  Lần nào cũng vậy, đúng một cách xếp nằm ở trên cùng — **gương**: vòng bóng được phản chiếu qua ô cửa. Hai quả bóng trong ô cửa đổi chỗ cho nhau, và các quả còn lại đổi chỗ từng cặp qua trục. Đáng ngạc nhiên là chỉ cần xếp bóng theo thứ tự ngược thì đã thấp hơn hai tầng.

  <b-art names="longest-ring-arrangement/mirror"/>
  <b-cap>Trái: thứ tự chuẩn; giữa: gương (nét đứt — trục đi qua ô cửa); phải: thứ tự ngược. <a href="https://youtu.be/ecc2GvvZGvM?t=112" target="_blank" rel="noopener">▶ 1:52</a></b-cap>
  <b-art names="longest-ring-arrangement/count"/>
  <b-cap>Độ dài thanh là số chữ số của số cách xếp. <a href="https://youtu.be/ecc2GvvZGvM?t=118" target="_blank" rel="noopener">▶ 1:58</a></b-cap>
</b-chapter>

<b-chapter id="pairs" icon="bulb" title="Trần bằng số cặp">
  <b-why>Năm quả bóng tạo thành các cặp theo mười đường, và trần của năm quả bóng cũng là 10. Sáu quả bóng: 15 cặp và trần là 15.</b-why>

  <b-art names="longest-ring-arrangement/pairs"/>
  <b-cap>Mỗi đường là một cặp bóng. <a href="https://youtu.be/ecc2GvvZGvM?t=150" target="_blank" rel="noopener">▶ 2:30</a></b-cap>

  Điều này khớp trên mọi vòng mà vét cạn đã phủ, bắt đầu từ bốn quả bóng; ba quả bóng có trần là 2 nhưng 3 cặp. Từ đó có giả thuyết trong Bách khoa toàn thư trực tuyến về các dãy số nguyên (OEIS A186783): trần luôn bằng số cặp, n(n−1)/2.

  <b-table>
    <table><thead>
    <tr><th>Số bóng</th><th class="bk-table-r">Số cặp</th><th class="bk-table-r">Trần theo vét cạn</th></tr>
    </thead><tbody>
    <tr><td>4</td><td class="bk-table-r">6</td><td class="bk-table-r">6</td></tr>
    <tr><td>5</td><td class="bk-table-r">10</td><td class="bk-table-r">10</td></tr>
    <tr><td>6</td><td class="bk-table-r">15</td><td class="bk-table-r">15</td></tr>
    <tr><td>10</td><td class="bk-table-r">45</td><td class="bk-table-r">45</td></tr>
    <tr><td>15</td><td class="bk-table-r">105</td><td class="bk-table-r">105</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Vét cạn đến 15 quả bóng cho ra cả đáp án “gương” lẫn công thức “số cặp”.</ex>
    <gen>Giải vét cạn các trường hợp nhỏ là cách rẻ để có một giả thuyết, rồi kiểm tra nó vượt xa tầm với của vét cạn.</gen>
    <do>Trước khi xây một phương pháp tinh vi, hãy tính trực tiếp các trường hợp nhỏ và tìm quy luật.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gap" icon="flag-alt" title="Hai mươi quả bóng: vét cạn không với tới">
  <b-why>Hai mươi quả bóng đã có 2,4·10¹⁸ cách xếp — hàng tỷ tỷ. Vì vậy giả thuyết được kiểm tra theo cách khác: lấy gương và tìm cách gỡ nó ngắn hơn.</b-why>

  Nếu đường đi không bao giờ ngắn hơn số cặp thì giả thuyết đúng. Trước hết là chương trình đại số máy tính kinh điển cho nhóm (GAP). Nó luôn tìm ra một đường nào đó nhưng không quan tâm đến độ dài: với vòng 20 quả bóng, nó chạy 41 phút và trả về 217.944 nước đi. Trong khi chỉ có 190 cặp.

  <b-art names="longest-ring-arrangement/gap"/>
  <b-cap>Trên: số cặp; dưới: đường đi của chương trình kinh điển. <a href="https://youtu.be/ecc2GvvZGvM?t=180" target="_blank" rel="noopener">▶ 3:00</a></b-cap>
</b-chapter>

<b-chapter id="compass" icon="search" title="La bàn từ video trước">
  <b-why>Các tác giả dùng lại mẹo từ <a href="/blog/rubik-cube-neural-network/">khối Rubik</a>: một chiếc la bàn được huấn luyện trên các lượt đi ngẫu nhiên.</b-why>

  Trước hết là **lượt đi ngẫu nhiên**: từ thứ tự chuẩn, thực hiện các nước đi ngẫu nhiên và sau mỗi nước ghi lại cách xếp cùng số nước đã đi. Không cần bản đồ của mọi cách xếp, và các lượt đi gần như không tốn gì. **La bàn** học từ các bản ghi này — một mạng nơ-ron nhìn vào một cách xếp và đoán tầng của nó.

  <b-art names="longest-ring-arrangement/net"/>
  <b-cap>La bàn là một mạng nơ-ron bình thường: đầu vào là một cách xếp, đầu ra là một con số.</b-cap>

  La bàn đoán có sai số: lượt đi ngẫu nhiên có vòng lặp, nên có nhiều nước đi hơn đường ngắn nhất. Nhưng lượt đi càng xa thì tầng trung bình càng cao, nên la bàn chỉ đúng hướng: số nhỏ hơn nghĩa là gần thứ tự chuẩn hơn.

  <b-art names="longest-ring-arrangement/walk"/>
  <b-cap>Lượt đi từ video: xám — bước của lượt đi, xanh — tầng thật. <a href="https://youtu.be/ecc2GvvZGvM?t=222" target="_blank" rel="noopener">▶ 3:42</a></b-cap>
  <b-io justify>
    <item k="Đầu vào">Một cách xếp: danh sách số của các quả bóng quanh vòng</item>
    <item k="La bàn">Một mạng nơ-ron đơn giản (một lớp 128 nơ-ron thường là đủ) hoặc gradient boosting</item>
    <item k="Đầu ra">Một ước lượng: cần bao nhiêu nước đi để về thứ tự chuẩn</item>
  </b-io>
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="Tuyến đầu: nhiều cách xếp cùng lúc">
  <b-why>Sai số của la bàn dẫn một đường đi đơn lẻ vào ngõ cụt. Vì vậy tìm kiếm tiến lên như một tuyến đầu — beam search trong bài báo.</b-why>

  Tuyến đầu là nhiều cách xếp cùng lúc. Ở mỗi bước, cả ba nước đi được thử từ mỗi cách xếp, la bàn chấm điểm các lân cận mới, và chỉ những cái triển vọng nhất được giữ cho bước sau. Nếu la bàn sai ở một cách xếp, vẫn còn những cách khác trong tuyến đầu, và đường đi không bị đứt.

  Với 20 quả bóng, cách này tìm ra đường đi đúng 190 nước — trong 3 phút 48 giây thay vì 41 phút. Đến 28 quả bóng, đường đi bằng số cặp; đến 44 quả thì vẫn tìm được nhưng dài hơn.

  <b-art names="longest-ring-arrangement/front"/>
  <b-cap>Chiều cao thanh là đường đi tìm được chia cho số cặp; đường kẻ là đúng số cặp. Bảng 2–3 của bài báo. <a href="https://youtu.be/ecc2GvvZGvM?t=258" target="_blank" rel="noopener">▶ 4:18</a></b-cap>
  <b-numchain>
    <step>thử ba nước đi từ mọi cách xếp trong tuyến đầu</step>
    <step>bỏ các bản trùng, la bàn chấm điểm chúng</step>
    <step>giữ lại những cái tốt nhất và lặp lại</step>
  </b-numchain>
</b-chapter>

<b-chapter id="hint" icon="bulb" title="Gợi ý một dòng">
  <b-why>Các tác giả thêm một dòng vào tìm kiếm: đừng đổi chỗ các quả bóng trong ô cửa nếu chúng đã đúng thứ tự.</b-why>

  Ý tưởng đơn giản: đổi chỗ một cặp đã đúng thứ tự hầu như không bao giờ có lợi, trong khi lựa chọn thừa làm phình tuyến đầu. Dòng đó đẩy giới hạn từ 40 lên 100 quả bóng. Với 100 quả bóng, đường đi tìm được trong 9 giờ, dù vẫn dài hơn số cặp hơn ba lần: 16.632 nước đi so với 4.950 cặp. Và gợi ý này được thiết kế riêng cho vòng bóng này: với các bài toán khác thì còn phải tìm.

  <b-art names="longest-ring-arrangement/hint"/>
  <b-cap>Trái: ô cửa nơi cấm đổi chỗ; phải: có thể gỡ được bao nhiêu quả bóng. <a href="https://youtu.be/ecc2GvvZGvM?t=294" target="_blank" rel="noopener">▶ 4:54</a></b-cap>
  <b-finding>
    <ex>Một quy tắc rút ra từ cấu trúc bài toán đã nâng số bóng giải được từ 40 lên 100.</ex>
    <gen>Hiểu biết về bài toán dưới dạng cấm các bước rõ ràng vô ích hiệu quả hơn việc tinh chỉnh mô hình.</gen>
    <do>Hãy tìm những nước đi không bao giờ đưa bạn đến gần mục tiêu hơn và loại chúng khỏi tìm kiếm.</do>
  </b-finding>
</b-chapter>

<b-chapter id="contest" icon="trophy" title="Một cuộc thi mở">
  <b-why>Các tác giả mời mọi người gỡ gương: một cuộc thi lập trình mở trên Kaggle, các vòng từ 2 đến 200 quả bóng.</b-why>

  Những người tham gia đã đạt được đường đi đúng bằng số cặp. Không ai tìm ra đường ngắn hơn — bằng chương trình hay bằng tay.

  <b-art names="longest-ring-arrangement/contest"/>
  <b-cap>Các vòng từ 2 đến 200 quả bóng; dấu tích nghĩa là đường đi đúng bằng số cặp. <a href="https://youtu.be/ecc2GvvZGvM?t=327" target="_blank" rel="noopener">▶ 5:27</a></b-cap>
</b-chapter>

<b-chapter id="triples" icon="shield-check" title="Vì sao không thể ngắn hơn: bộ ba">
  <b-why>Lấy ba quả bóng bất kỳ. Quanh vòng, chúng chạy theo chiều kim đồng hồ hoặc ngược chiều kim đồng hồ.</b-why>

  Xoay vòng không đảo chiều một bộ ba: mọi quả bóng cùng di chuyển và thứ tự xung quanh được giữ nguyên. Chỉ phép đổi chỗ trong ô cửa mới đảo chiều được, và chỉ khi hai quả bóng của bộ ba đang ở trong ô cửa. Còn gương đảo chiều tất cả các bộ ba cùng lúc. Từ đó các tác giả chứng minh rằng gương cần gần bằng số cặp nước đi: ít hơn nhiều nhất là một nửa số bóng cộng một nước.

  <b-art names="longest-ring-arrangement/triples"/>
  <b-cap>Bộ ba 1, 2, 4: trái là nguyên trạng, giữa là sau khi xoay, phải là sau khi đổi chỗ. <a href="https://youtu.be/ecc2GvvZGvM?t=351" target="_blank" rel="noopener">▶ 5:51</a></b-cap>
</b-chapter>

<b-chapter id="fork" icon="shield-check" title="Khoảng kẹp: các cận đã chứng minh">
  <b-why>Từ phía trên, trần bị chặn bởi phương pháp gỡ của các tác giả: mọi cách xếp đều gỡ được trong nhiều nhất là số cặp cộng ba nước đi cho mỗi quả bóng.</b-why>

  Từ đó có một khoảng kẹp. Với 20 quả bóng, trần nằm giữa 179 và 250, trong khi giả thuyết nói 190. Số bóng càng nhiều thì khoảng kẹp càng hẹp so với chính trần: với 100 quả bóng, nó trải ra vài phần trăm của số cặp.

  <b-art names="longest-ring-arrangement/fork"/>
  <b-cap>Thanh là các cận đã chứng minh, đường kẻ là giả thuyết. <a href="https://youtu.be/ecc2GvvZGvM?t=389" target="_blank" rel="noopener">▶ 6:29</a></b-cap>
</b-chapter>

<b-chapter id="main" icon="flag" title="Kết luận">
  <b-why>Câu hỏi là: cách xếp nào gỡ lâu nhất và cần bao nhiêu nước đi? Nhiều khả năng là gương, với số nước đi bằng số cặp bóng.</b-why>

  <b-step-chain>
    <node t="Vét cạn">đến 15 quả bóng: gương và số cặp</node>
    <node t="La bàn và tuyến đầu">chính xác đến 28, đến 100 với gợi ý</node>
    <node t="Cuộc thi">đến 200 quả bóng, không có gì ngắn hơn</node>
    <node t="Chứng minh">một khoảng kẹp quanh số cặp</node>
  </b-step-chain>

  Sau bài báo, một trong các tác giả, Grigorii Antiufeev, đã đăng một chứng minh rằng gương không thể gỡ nhanh hơn số cặp (<a href="https://arxiv.org/abs/2601.08715" target="_blank" rel="noopener">arXiv 2601.08715</a>, bản preprint năm 2026). Còn một điều chưa rõ: liệu có cách xếp nào còn xa hơn nữa không.
  <b-callout icon="shield-check">**Lưu ý.** “Trần = số cặp” là một giả thuyết: chỉ có các cận được chứng minh. Cận dưới đúng bằng số cặp là một preprint chưa qua bình duyệt.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Dạng hình thức: cùng con đường bằng ngôn ngữ của bài báo">
  <b-why>Phần thứ hai của video: cùng các bước dưới dạng công thức.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Trong video</th><th>Trong bài báo</th><th>Hoạt động thế nào</th></tr>
    </thead><tbody>
    <tr><td>vòng cùng mọi cách xếp</td><td>đồ thị Cayley LRX của nhóm đối xứng Sₙ</td><td>đỉnh là các hoán vị, cạnh là các nước đi</td></tr>
    <tr><td>nước đi</td><td>các phần tử sinh L, R, X</td><td>L — dịch trái, R = L⁻¹, X = (0, 1) — đổi chỗ hai vị trí đầu</td></tr>
    <tr><td>trần</td><td>đường kính đồ thị</td><td>giả thuyết: n(n−1)/2 với n ≥ 4</td></tr>
    <tr><td>gương</td><td>phần tử dài nhất ℓₙ</td><td>(1 0 n−1 … 3 2) = R² · (thứ tự ngược)</td></tr>
    <tr><td>la bàn</td><td>mạng trên khoảng cách khuếch tán + Q-learning</td><td>trước hết học từ các lượt đi ngẫu nhiên, sau đó được đối chiếu với phương trình Bellman d(s) = 1 + min d(t) trên các lân cận t</td></tr>
    <tr><td>tuyến đầu</td><td>beam search</td><td>độ rộng đến 2²⁰; gợi ý là mẹo X</td></tr>
    <tr><td>khoảng kẹp</td><td>mệnh đề 4.2 và 4.3</td><td>n(n−1)/2 − n/2 − 1 ≤ đường kính ≤ n(n−1)/2 + 3n</td></tr>
    </tbody></table>
  </b-table>

  Điểm mới của bài báo là cách huấn luyện la bàn. Các lượt đi ngẫu nhiên cho một dự đoán đầu tiên, sau đó la bàn được đối chiếu với các lân cận của nó: về thứ tự chuẩn nhiều hơn một nước so với lân cận gần nhất. Giống như đường về nhà: nếu hàng xóm của bạn cách năm phút thì bạn cách nhiều nhất sáu phút. Trên vòng 28 quả bóng, cách này giảm đường đi điển hình từ 650 nước xuống 402, với 378 cặp.

  <b-codebox copy>
    def beam_search(start, model, W, steps=1000):
        front = [start]
        for _ in range(steps):
            nbrs = {m(s) for s in front for m in (L, R, X)
                    if not (m is X and s[0] < s[1])}   # the hint
            if SORTED in nbrs: return True
            front = sorted(nbrs, key=model)[:W]   # W best by the compass
        return False
  </b-codebox>
  <b-cap>Bản phác thảo beam search với gợi ý; mã đầy đủ có trên Kaggle. <a href="https://youtu.be/ecc2GvvZGvM?t=586" target="_blank" rel="noopener">▶ 9:46</a></b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Dùng vào đâu">
  <b-why>La bàn và tuyến đầu không quan tâm đó là vòng bóng: chúng chỉ cần các trạng thái, nước đi và mục tiêu. Vì vậy cùng cách tiếp cận này hợp với mọi bài toán đi từ trạng thái này sang trạng thái khác theo đường ngắn nhất.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Mối liên hệ</th><th>Ở đâu</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">trực tiếp</b-tag></td><td>các câu đố TopSpin (Oval Track) và Hungarian Rings hoạt động gần giống nhau</td></tr>
    <tr><td><b-tag kind="ok">trực tiếp</b-tag></td><td>mạng bộ xử lý: đường kính của đồ thị liên kết là độ trễ thông điệp dài nhất</td></tr>
    <tr><td><b-tag kind="ok">trực tiếp</b-tag></td><td>đường đi ngắn nhất trong các đồ thị hoán vị khổng lồ mà vét cạn là bất khả thi</td></tr>
    <tr><td><b-tag kind="plain">tương tự</b-tag></td><td>lập kế hoạch: đi từ trạng thái này sang trạng thái khác bằng các bước nhỏ</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Bài học.** Vét cạn cho ra giả thuyết, một chương trình đã huấn luyện kiểm tra nó vượt xa tầm vét cạn, và một chứng minh kẹp đáp án vào một khoảng.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Ai và khi nào, điều gì đã được chứng minh">
  <b-steps top="14" round>
    <step t="1968">Viktor Glushkov: bài toán vòng bóng với hai nước đi</step>
    <step t="2011">Dãy ba nước đi vào OEIS (A186783)</step>
    <step t="2020">Giả thuyết được ghi nhận: trần = n(n−1)/2</step>
    <step t="2025" hl>Bài báo CayleyPy RL: 34 tác giả, AI, vét cạn, một cuộc thi và các cận</step>
    <step t="2026">Công bố trên tạp chí; preprint của Antiufeev: cận dưới đúng bằng số cặp</step>
  </b-steps>

  Đã chứng minh: n(n−1)/2 − n/2 − 1 ≤ đường kính ≤ n(n−1)/2 + 3n; đẳng thức và tính duy nhất của gương là các giả thuyết. Bài báo có vài điểm không nhất quán nhỏ: phần tóm tắt trên arXiv viết cận dưới không có “− 1”, và mục 3.3 dẫn đến bảng 8 thay vì bảng 6.
</b-chapter>

<b-chapter id="faq" icon="chat" title="Câu hỏi thường gặp">
  <b-faq-cards>
    <q t="Đồ thị Cayley là gì?">Bản đồ của mọi trạng thái của một câu đố hoặc một nhóm: mỗi trạng thái là một điểm, mỗi nước đi hợp lệ là một đường nối đến trạng thái lân cận. Với vòng bóng, đó là mọi cách xếp và ba nước đi giữa chúng.</q>
    <q t="Đường kính của đồ thị và God's number là gì?">Số nước đi lớn nhất mà đường ngắn nhất giữa hai trạng thái có thể cần. Với khối Rubik, nó được gọi là God's number: 20 nước nếu nửa vòng xoay được tính là một nước.</q>
    <q t="Đường kính của vòng bóng có phép xoay và đổi chỗ là bao nhiêu?">Theo giả thuyết, là n(n−1)/2 — số cặp bóng, từ bốn quả bóng trở lên. Vét cạn xác nhận điều đó đến 15 quả bóng; đã chứng minh nó nằm giữa n(n−1)/2 − n/2 − 1 và n(n−1)/2 + 3n.</q>
    <q t="Giả thuyết đã được chứng minh chưa?">Chưa hoàn toàn. Năm 2026 một trong các tác giả đã đăng chứng minh cho cận dưới đúng bằng số cặp, nhưng đó là preprint; cận trên vẫn cao hơn 3 nước cho mỗi quả bóng.</q>
    <q t="Mạng nơ-ron tìm đường trong đồ thị khổng lồ như thế nào?">Mạng la bàn học từ các lượt đi ngẫu nhiên để đoán khoảng cách đến mục tiêu, và beam search giữ nhiều trạng thái tốt nhất theo ước lượng của nó cùng lúc để một sai sót không dẫn vào ngõ cụt.</q>
    <q t="Tôi có thể tự thử không?">Có: mã của các tác giả mở và chạy miễn phí trên Kaggle, còn thư viện CayleyPy có trên GitHub (liên kết bên dưới).</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Đọc tiếp">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2502.18663" k="Bài báo" t="arXiv 2502.18663" ext>CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Mã" t="CayleyPy trên GitHub" ext>Thư viện tìm đường trong các đồ thị hoán vị</item>
    <item href="/blog/rubik-cube-neural-network/" k="Bài trước" t="Khối Rubik">Cùng nhóm: la bàn, tuyến đầu và đội hình trên khối 4×4×4 và 5×5×5</item>
    <item href="https://youtu.be/ecc2GvvZGvM" k="Video" t="Trên YouTube" ext>Cùng câu chuyện trong 11 phút, có 3D và công thức (bằng tiếng Nga)</item>
  </b-links>
</b-chapter>
<b-footer>Các con số lấy từ A. Chervov, M. Obozov, A. Soibelman, …, K. Khoruzhii, A. Romanov, arXiv 2502.18663 (bảng 2–6, mệnh đề 4.2–4.3), và OEIS A186783. Các tầng cho năm và sáu quả bóng được tính lại bằng vét cạn; ví dụ trong sơ đồ la bàn nằm ở tầng 7. Tác giả blog là đồng tác giả của bài báo CayleyPy đầu tiên, về khối Rubik.</b-footer>
</b-post>
