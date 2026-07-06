import { notifyIndexNow } from "../src/lib/indexnow";

notifyIndexNow()
  .then((ok) => {
    console.log(
      ok ? "[indexnow] URLs notificadas." : "[indexnow] Sin confirmación del buscador."
    );
  })
  .catch((error) => {
    console.warn("[indexnow] Error:", error);
  });
