**Mong muốn:** đặc tả

**Người thực hiện:** tác nhân

**Thực tế:** code

**Phép đo:** test

## Cùng một vòng lặp như trong Kubernetes

Trạng thái mong muốn ở đây là từ điển aggregate: mỗi khái niệm một mục, các yêu cầu được đánh dấu MUST và SHOULD.

con người thay đổi trạng thái mong muốn

mong muốn

người thực hiện

thực tế

phép đo

**Kubernetes:**

mong muốn chart · manifest

người thực hiện controller

thực tế node · pod

phép đo probe · metric

**Đặc tả:**

mong muốn từ điển · MUST

người thực hiện tác nhân

thực tế code

phép đo test · chất lượng

phép đo → người thực hiện, lặp đi lặp lại

Vòng đối chiếu theo tài liệu Kubernetes về controller.

**Kết luận:**

**Trong ví dụ này:** Trong Kubernetes, con người sửa chart và controller đưa các node về khớp. Ở đây con người sửa từ điển và tác nhân đưa code về khớp rồi kiểm tra bằng test.

**Nói chung:** Cả hai hệ thống giữ trạng thái mong muốn tách khỏi trạng thái thực tế và đối chiếu chúng trong một vòng lặp. Con người trong vòng lặp chỉ thay đổi trạng thái mong muốn, nên mỗi chỉnh sửa lập tức thành việc cho người thực hiện.

**Bước tiếp theo:** Sửa yêu cầu trong từ điển thay vì sửa code bằng tay, và chạy tác nhân với nhiệm vụ đưa code về khớp với từ điển.

## Một phép kiểm tra chỉ thấy điều đã được đặt vào nó

Ví dụ là việc đặt phòng họp trong Đặc tả theo aggregate: ba yêu cầu MUST và một SHOULD.

**Kubernetes:**

/healthz → 200

hàng đợi đơn hàng bị kẹt

probe xanh, dịch vụ hỏng

**Đặc tả:**

MUST · không chồng nhautest

MUST · chỉ đi tiếntest

MUST · 15 phút → đóngkhông có kiểm tra

SHOULD · kênhxem lại

MUST được phủ

**2 / 3:**

test xanh, một MUST chưa được kiểm tra

mỗi MUST → phép kiểm tra riêng MUST không có kiểm tra = lỗ hổng xanh ≠ đúng

Có những probe nào và chúng kiểm tra gì: Kubernetes: probe.

**Kết luận:**

**Trong ví dụ này:** Probe trả lời “200” trong khi đơn hàng bị kẹt, và test đặt chỗ xanh trong khi không ai kiểm tra quy tắc 15 phút.

**Nói chung:** Một phép kiểm tra chỉ xác nhận điều đã được viết vào nó và không nói gì về phần còn lại. Vì vậy thẻ aggregate được so với các phép kiểm tra: MUST không có kiểm tra là lỗ hổng, không phải yêu cầu đã đáp ứng.

**Bước tiếp theo:** Đi qua các MUST trong từ điển của bạn và đánh dấu những cái không có test. Biến mỗi cái thành một nhiệm vụ, hoặc chủ động hạ nó xuống SHOULD.

## Môi trường quyết định vòng lặp có khép lại được không

**cluster:** môi trường của controller

≈

**harness:** môi trường của tác nhân

**Chạy code:** thiếu nó → đoán thay cho dữ kiện

**Test:** thiếu nó → không kiểm tra được MUST

**Log:** thiếu nó → không thấy cái gì hỏng

**Dữ liệu thử:** thiếu nó → kiểm tra trên bảng rỗng

**Dịch vụ qua MCP:** thiếu nó → tích hợp trong mù mờ

**Sandbox và quyền:** thiếu nó → quá rủi ro để cho hành động

Bài riêng Chọn môi trường: so sánh các harness Claude Code, Codex, Cursor, Hermes và chat trên cùng một bản đồ

**Kết luận:**

**Trong ví dụ này:** Controller của Kubernetes hoạt động được vì cluster cho nó một API, các node và probe. Để có cùng vòng lặp, tác nhân cần chạy code, test, log, dữ liệu, dịch vụ và sandbox.

**Nói chung:** Từ điển đặt trạng thái mong muốn, nhưng chỉ ai chạy và đo được code mới đối chiếu nó với trạng thái đó. Môi trường thiếu gì thì tác nhân không kiểm tra được cái đó, và vòng lặp vẫn hở ở điểm ấy.

**Bước tiếp theo:** Đánh dấu tác nhân của bạn có những khả năng nào trong sáu khả năng. Với mỗi khả năng còn thiếu, quyết định thêm nó vào harness hay đổi harness.

## Đọc tiếp

Trạng thái mong muốn

Đặc tả theo aggregate

từ điển, yêu cầu RFC và các ngữ cảnh

Vòng lặp lỗi

Harness-Driven Development

sai sót của tác nhân trở thành quy tắc thế nào

Môi trường

So sánh các harness

tác nhân làm việc ở đâu và thấy gì

Đặc tả

Cài đặt và lệnh OpenSpec

đặc tả và thay đổi trong tệp cạnh mã

Ví dụ đặt chỗ được bịa ra. Thuật ngữ và cách tiếp cận theo các nguồn dẫn dưới các sơ đồ.
