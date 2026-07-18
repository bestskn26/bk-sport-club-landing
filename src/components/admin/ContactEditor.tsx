import type { ContactContent } from "@/lib/content";
import { Field, inputClass } from "./fields";

export default function ContactEditor({
  contact,
  onChange,
}: {
  contact: ContactContent;
  onChange: (contact: ContactContent) => void;
}) {
  function update<K extends keyof ContactContent>(
    key: K,
    value: ContactContent[K],
  ) {
    onChange({ ...contact, [key]: value });
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="เบอร์โทรศัพท์">
        <input
          type="text"
          value={contact.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="อีเมล">
        <input
          type="email"
          value={contact.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="LINE ID">
        <input
          type="text"
          value={contact.lineId}
          onChange={(e) => update("lineId", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="เวลาทำการ">
        <input
          type="text"
          value={contact.businessHours}
          onChange={(e) => update("businessHours", e.target.value)}
          className={inputClass}
        />
      </Field>
    </div>
  );
}
