1

**Prompt:** cách diễn đạt yêu cầu

2

**Ngữ cảnh:** những gì mô hình biết

3

**Harness:** môi trường của tác nhân HDD

Các giai đoạn theo mô tả của Faros và marmelab

## Ba giai đoạn

Prompt

vai trò định dạng ví dụ

sửa một yêu cầu

Ngữ cảnh

tài liệu bộ nhớ dự án

sửa những gì mô hình biết

Harness

công cụ kiểm thử quy tắc quyền

sửa mọi lần chạy sau này

**Kết luận:**

**Trong ví dụ này:** Prompt sửa một câu trả lời, ngữ cảnh sửa những gì mô hình biết, còn harness sửa mọi lần chạy sau này của tác nhân.

**Nói chung:** Harness-Driven Development là công việc ở giai đoạn thứ ba: lập trình viên viết ít mã hơn và dành nhiều thời gian hơn để thiết lập môi trường nơi tác nhân viết, kiểm tra và sửa mã.

**Bước tiếp theo:** Ghi lại ba lỗi gần nhất của tác nhân và đánh dấu giai đoạn mà mỗi lỗi có thể đã được sửa dứt điểm.

## Vòng lặp HDD

Nguyên tắc của Mitchell Hashimoto: khi tác nhân mắc lỗi, hãy thay đổi harness để lỗi đó không thể xảy ra nữa Faros

**Kết luận:**

**Trong ví dụ này:** Một lỗi mà các sensor bắt được sẽ đi vào harness như một quy tắc mới, và tác nhân nhận quy tắc đó ở mọi lần chạy sau.

**Nói chung:** Kết quả sửa tay chỉ giúp được một lần. Quy tắc trong harness (hướng dẫn, kiểm thử hoặc hook) áp dụng cho mọi tác vụ sau này, nên harness ngày càng chính xác mà không cần đổi mô hình.

**Bước tiếp theo:** Đặt ra một quy tắc: mọi lỗi của tác nhân mà bạn phải sửa tay sẽ thành một dòng trong hướng dẫn hoặc một kiểm thử ngay trong ngày.

## Harness được bố trí thế nào: 3 × 3

Ba miền của vòng lặp và ba ngữ cảnh trong mỗi miền — chín canon. Mỗi canon thuộc đúng một miền và một ngữ cảnh.

**Spec:** điều gì phải đúng

**Skill:** cách hành động

**Memory:** dựa vào đâu

**Kỳ vọng:** cái gì nên có

Spec thể loại, lược đồ mức yêu cầu hộ chiếu số liệu

Skill dự đoán trước khi hành động

Memory vai trò bộ chấp hành live · MCP

**Quan sát:** cái gì đã đo được

Spec thứ hạng bằng chứng định dạng phát hiện thang đo

Skill sensor ghi lại sự thật

Memory chỉ live

**Vòng lặp:** so sánh và quyết định

Spec tiêu chí đầy đủ của quy tắc sổ đăng ký phát hiện

Skill so sánh đếm lần lặp lại vá hoặc sửa quy tắc

Memory tạm thời trống

Kỳ vọng Quan sát

Vòng lặp ✕ không có liên kết ngược

vá sửa quy tắc

→ skill → spec của miền của nó· script hook khi commit kiểm tra chiều này

**snapshot:** một bảng, cập nhật sau mỗi lần đo mới

**live:** một giao thức, luôn mới mỗi lần, không lưu gì

**Kết luận:**

**Trong ví dụ này:** Vòng lặp chia thành Kỳ vọng, Quan sát và Vòng lặp, mỗi phần có spec, skill và memory riêng. Vòng lặp đọc hai miền kia; chúng không bao giờ đọc Vòng lặp.

**Nói chung:** Đây là vòng phản hồi âm: giá trị mục tiêu được so với giá trị đo được, và chỉ khi lệch mới có gì đó thay đổi. Chiều tham chiếu chặt chẽ giữ cho các miền không rối, và cùng một khái niệm lặp lại ở hai miền không phải là khuyết điểm.

**Bước tiếp theo:** Xếp các tệp của harness vào chín ô và kiểm tra rằng không tệp Kỳ vọng hay Quan sát nào tham chiếu đến Vòng lặp.

## Vòng lặp kép

**vòng đơn:** sửa hành động trong cùng các quy tắc

**vòng kép:** thay đổi chính các quy tắc

**Vá mà không có dự đoán mới:** sửa bằng một quy tắc

**Nhiều phàn nàn:** trước hết kiểm tra xem có nguyên nhân chung không

**Quy tắc mới:** chỉ chấp nhận nếu các trường hợp cũ suy ra được từ nó

**Không có kiểm tra bên ngoài:** bỏ đi, kèm ghi chép

Vòng lặp áp dụng cho chính nó: mỗi lần chạy kết thúc bằng rủi ro còn lại, không bao giờ bằng trạng thái “xong”.

**Kết luận:**

**Trong ví dụ này:** Chuỗi bản vá, phàn nàn, quy tắc mới và kiểm tra bên ngoài là bốn nguyên tắc kiểm chứng được mà Vòng lặp dùng để quyết định nên sửa hành động hay đổi quy tắc.

**Nói chung:** Vòng đơn sửa kết quả trong các quy tắc cũ. Vòng kép đổi chính các quy tắc, và làm theo các nguyên tắc kiểm chứng được, nên harness học được mà không trôi dạt vì những lần sửa ngẫu nhiên.

**Bước tiếp theo:** Khi cùng một bản sửa xuất hiện lần thứ ba, hãy dừng lại và hỏi quy tắc nào gây ra nó. Chỉ đổi quy tắc nếu nó cũng giải thích được các trường hợp cũ.

## Guide và sensor

**Guide:** trước hành động

**Sensor:** sau hành động

**Tính toán:** nhanh · đáng tin

kiểu dữ liệu mẫu mã bộ sinh mã

kiểm thử linter kiểm tra kiểu

**Dựa trên AI:** linh hoạt · đắt hơn

AGENTS.md · CLAUDE.md skill đặc tả

review bằng AI LLM làm giám khảo

Cách chia theo mô tả trong Martin Fowler: Harness engineering

**Kết luận:**

**Trong ví dụ này:** Bốn ô: guide định hướng trước khi tác nhân làm việc, sensor bắt sai lệch sau đó, và mỗi loại có thể là tính toán hoặc dựa trên AI.

**Nói chung:** Kiểm tra tính toán chạy trong vài giây và không mắc lỗi, nên hãy dùng chúng ở mọi nơi có thể viết quy tắc một cách hình thức. Để kiểm tra dựa trên AI cho phần ý nghĩa: phong cách, độ rõ ràng, độ khớp với ý định.

**Bước tiếp theo:** Với mỗi quy tắc trong hướng dẫn của tác nhân, hãy hỏi liệu một kiểm thử hay linter có kiểm tra được không. Nếu được, chuyển nó sang đó.

## Ba lớp kiểm tra

**Chất lượng mã:**

trưởng thành

**Kiến trúc:**

đang phát triển

**Hành vi:**

khó nhất

Mức trưởng thành của các lớp theo đánh giá của Martin Fowler

**Kết luận:**

**Trong ví dụ này:** Chất lượng mã là dễ kiểm tra nhất hiện nay, còn hành vi sản phẩm là khó nhất.

**Nói chung:** Linter và công cụ định dạng phủ lớp đầu gần như ngay lập tức. Kiến trúc được kiểm tra bằng quy tắc phụ thuộc và yêu cầu hiệu năng. Hành vi vẫn cần kiểm thử kịch bản tốt và con mắt của con người.

**Bước tiếp theo:** Bắt đầu với lớp đầu: chạy linter và công cụ định dạng ở mỗi lần tác nhân chạy, rồi thêm một quy tắc về ranh giới module.

## Càng sớm càng rẻ

**Trước khi làm:** hướng dẫn · đặc tả $

**Khi viết:** hook · linter $$

**Trong CI:** kiểm thử · build $$$

**Khi review:** một con người $$$$

**Kết luận:**

**Trong ví dụ này:** Cùng một lỗi tốn ít nhất trước khi tác nhân bắt đầu và tốn nhất ở review của con người.

**Nói chung:** Hãy đặt các phép kiểm tra nhanh càng sớm càng tốt: tác nhân tự sửa vấn đề khi ngữ cảnh tác vụ còn ngay trước mặt, và chỉ các điểm còn tranh cãi mới đến tay con người.

**Bước tiếp theo:** Nối kiểm thử và linter vào một hook mà tác nhân chạy sau mỗi lần sửa, ngoài CI.

## Con người quan trọng ở đâu

Harness

phong cách · kiểu dữ liệu · kiểm thử · ranh giới

Con người

kiến trúc · sản phẩm · quy tắc mới

“Một harness tốt giữ con người trong vòng lặp và hướng sự chú ý của họ vào nơi quan trọng nhất” — diễn giải từ Martin Fowler

**Kết luận:**

**Trong ví dụ này:** Harness đảm nhận phần lớn các phép kiểm tra; con người giữ các quyết định và công việc cải thiện harness.

**Nói chung:** Một lập trình viên giàu kinh nghiệm mang trong đầu một harness ngầm: hiểu biết về kiến trúc, thói quen của nhóm, cảm giác về rủi ro. HDD chuyển hiểu biết đó thành các quy tắc tường minh, để mỗi lần tác nhân chạy đều nhận được nó.

**Bước tiếp theo:** Sau mỗi lần review mã của tác nhân, ghi lại một nhận xét cứ lặp đi lặp lại và biến nó thành quy tắc.

## HDD và đặc tả

**Đặc tả:** kết quả bạn cần

**Harness:** cách kiểm tra là đã đạt

**Mã được chấp nhận:** không cần review thủ công từng dòng

“Specs define the target state, the harness is the control system” — Loiane Groner. Thêm về đặc tả trong bài nói Spec-Driven Development trong thực tế

**Kết luận:**

**Trong ví dụ này:** Đặc tả trả lời “đang xây cái gì”, harness trả lời “làm sao biết đã xây xong”.

**Nói chung:** Không có đặc tả thì harness không có gì để kiểm tra, và không có harness thì đặc tả chỉ là một tài liệu. Kết hợp lại, chúng cho phép chấp nhận mã của tác nhân dựa trên các phép kiểm tra thay vì đọc từng dòng.

**Bước tiếp theo:** Với mỗi yêu cầu trong đặc tả, ghi lại kiểm thử hoặc phép kiểm tra nào sẽ xác nhận yêu cầu đó được đáp ứng.

## Bắt đầu từ đâu

1

Tệp hướng dẫn cho tác nhân

AGENTS.md hoặc CLAUDE.md ở thư mục gốc dự án: cách build, cách kiểm thử, điều không được làm

2

Linter và kiểm thử sau mỗi lần sửa

một hook mà tác nhân tự chạy trước khi giao kết quả

3

Nhật ký lỗi của tác nhân

mỗi lỗi sửa tay được ghi một dòng kèm nguyên nhân

4

Lỗi → quy tắc

mỗi tuần một lần, chuyển các mục trong nhật ký thành hướng dẫn, kiểm thử hoặc hook

5

Tệp tiến độ cho tác vụ dài

danh sách tính năng kèm trạng thái và lịch sử commit, để phiên mới tiếp tục từ chỗ phiên trước dừng Anthropic

**Kết luận:**

**Trong ví dụ này:** Năm bước: hai bước dựng harness ngay, ba bước khởi động vòng “lỗi → quy tắc”.

**Nói chung:** Không ai thiết kế harness đầy đủ từ trước. Nó lớn lên từ các lỗi thật của tác nhân trong dự án của bạn, và sau vài tuần tác nhân thôi lặp lại những lỗi phổ biến nhất.

**Bước tiếp theo:** Hôm nay hãy tạo tệp hướng dẫn và nhật ký lỗi. Một tuần sau, chuyển các mục đầu tiên trong nhật ký thành quy tắc.

## Đọc thêm

Giai đoạn 1–2

Prompt cho công việc

cách viết một yêu cầu đơn lẻ và cung cấp dữ liệu

Giai đoạn 3

So sánh các harness

Claude Code, Codex, Cursor, Hermes và chat

Đọc thêm: Martin Fowler · Anthropic: Harness design · Becoming a Harness-Driven Developer · awesome-harness-engineering

Thuật ngữ và cách chia lớp dựa theo các nguồn được dẫn ở chú thích dưới các sơ đồ.
