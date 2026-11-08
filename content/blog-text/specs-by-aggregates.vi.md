**Ngữ cảnh:** đặt chỗ

**Aggregate:** Reservation

**Bất biến:** MUST

**Kiểm tra:** test

## Vì sao đặc tả chất đống

**Đặc tả cho mỗi tính năng:** khái niệm được mô tả ở mọi tính năng

**12 file:** “Đặt chỗ” ở 7

tăng theo số tính năng

**Từ điển aggregate:** khái niệm được mô tả một lần

Reservation

Room

TimeSlot

Member

**4 mục:** “Đặt chỗ” ở 1

tăng theo miền nghiệp vụ

Tính năng 13 → [booking::Reservation]+1 MUST → test+1

Các con số chỉ mang tính minh họa. Cách OpenSpec tổ chức đặc tả và thay đổi: các thư mục specs/ và changes/, thay đổi đã xong được chuyển vào kho lưu trữ.

**Kết luận:**

**Trong ví dụ này:** Mười hai tính năng sinh ra mười hai đặc tả, và việc đặt chỗ được mô tả ở bảy trong số đó, mỗi nơi một chút khác nhau. Trong từ điển, cũng mười hai tính năng đó chỉ thêm dòng vào bốn mục aggregate.

**Nói chung:** Khi đặc tả gắn với một thay đổi hay một tính năng, mỗi nhiệm vụ lại thêm file, và một khái niệm trôi dạt qua nhiều nơi. Khi đơn vị là aggregate, số mục bị chặn bởi chính miền nghiệp vụ, và một tính năng chỉ bổ sung yêu cầu vào một mục.

**Bước tiếp theo:** Liệt kê các khái niệm xuất hiện ở ba đặc tả trở lên và cho mỗi khái niệm một mục duy nhất trong từ điển. Để các đặc tả tính năng liên kết tới mục đó thay vì kể lại nó.

## Các mức yêu cầu theo RFC 2119

Từ Ý nghĩa Độ mạnh Kiểm tra

MUSTbắt buộc test tự độngchặn

MUST NOTbị cấm test tự độngchặn

SHOULDmặc định, chỉ lệch khi có lý do xem lạicảnh báo

MAYđược phép khôngkhông kiểm tra

MUST = SHALL

Các từ và ý nghĩa theo RFC 2119. Mỗi từ ứng với một kiểu kiểm tra riêng.

**Kết luận:**

**Trong ví dụ này:** Trong mục đặt chỗ, “các khoảng thời gian không chồng nhau” là MUST được kiểm bằng test, còn “xác nhận đi qua cùng kênh” là SHOULD được xem ở bước xem lại.

**Nói chung:** Từ chỉ mức yêu cầu cho biết ngay cách kiểm tra và việc cần làm khi vi phạm. Tác nhân đọc MUST như một ranh giới và SHOULD như một mặc định, và không nhầm lẫn chúng.

**Bước tiếp theo:** Viết lại các yêu cầu trong đặc tả của bạn bằng bốn từ này và đặt test kiểm tra nó cạnh mỗi MUST.

## Thẻ aggregate
```
## [booking::Reservation]

Class: aggregate

Description: Một phòng họp được đặt cho một khoảng thời gian.
```
1 địa chỉ: ngữ cảnh::tên
```
Invariants:

  - MUST: các lượt đặt đang hoạt động của một phòng không bao giờ chồng nhau

  - MUST: held → confirmed → closed, chỉ đi tiến

  - MUST: held mà chưa xác nhận sau 15 phút → closed

  - SHOULD: xác nhận qua kênh đã dùng để đặt
```
2 yêu cầu → kiểm tra
```
Commands: HoldRoom, ConfirmReservation,

          CancelReservation
```
3 cách duy nhất để thay đổi nó
```
Access:

  CanHoldRoom: [booking::Role::Member]

  CanCancelReservation: Member (của mình), Admin
```
4 ai được phép
```
Depends on: [[booking::Room]], [[booking::TimeSlot]]
```
5 liên kết theo id
```
Spec: [[room-booking]]
```
6 nó đến từ tính năng nào

Ví dụ được bịa ra. Thuật ngữ theo Martin Fowler: DDD Aggregate.

**Kết luận:**

**Trong ví dụ này:** Toàn bộ việc đặt chỗ là một thẻ: một địa chỉ, bốn yêu cầu, ba lệnh, quyền, liên kết và tính năng mà nó đến từ đó.

**Nói chung:** Aggregate là một ranh giới mà bên trong nó các yêu cầu luôn đúng, và nó chỉ thay đổi được qua các lệnh của chính nó. Vì vậy thẻ giữ các quy tắc cạnh những cách duy nhất để phá chúng.

**Bước tiếp theo:** Cho mỗi aggregate một thẻ sáu trường. Nếu một yêu cầu không gán được cho aggregate nào, nhiều khả năng aggregate đó chưa được đặt tên.

## Bounded context

booking

Reservation Room TimeSlot

billing

Invoice Tariff

access

Pass Level

liên kết giữa các ngữ cảnh chỉ đi theo id billing::Invoice→ id → booking::Reservation access::Pass→ id → booking::Reservation

“Level”

booking::Room.floorTầng

access::LevelCấp quyền

một từ, hai thuật ngữ, nhãn khác nhau

một thuật ngữ = một mục liên kết dạng [[ctx::Name]] cùng một từ → các mục riêng từ điển đổi cùng đặc tả

Cách tiếp cận là Bounded Context và Ubiquitous Language.

**Kết luận:**

**Trong ví dụ này:** Hóa đơn và thẻ ra vào tham chiếu tới một lượt đặt chỗ theo id và không biết gì về bên trong nó. “Level” nghĩa là tầng ở đặt chỗ và là cấp quyền ở truy cập, và đây là hai mục riêng.

**Nói chung:** Ngữ cảnh là vùng mà mỗi từ có một nghĩa. Khi một từ xuất hiện ở hai ngữ cảnh, hãy tạo hai thuật ngữ với nhãn khác nhau; nếu không, tác nhân sẽ mang quy tắc của bên này sang bên kia.

**Bước tiếp theo:** Phân các aggregate của bạn vào các ngữ cảnh và tìm những từ xuất hiện ở hai ngữ cảnh. Cho mỗi từ như vậy các mục riêng và nhãn khác nhau trên giao diện.

## Đọc tiếp

Phần tiếp

**Vòng đối chiếu cho đặc tả:** như Kubernetes: trạng thái mong muốn, kiểm tra và môi trường của tác nhân

Vòng lặp lỗi

Harness-Driven Development

sai sót của tác nhân trở thành quy tắc thế nào

Ngữ cảnh

Đặc tả, bible, quy tắc và skill

tác nhân biết gì về dự án và nó nằm ở đâu

Môi trường

So sánh các harness

tác nhân làm việc ở đâu và thấy gì

Ví dụ đặt chỗ được bịa ra. Thuật ngữ và cách tiếp cận theo các nguồn dẫn dưới các sơ đồ.
