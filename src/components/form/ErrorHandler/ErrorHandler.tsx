import globals from "@/styles/global.module.css";
import form_globals from "@/styles/global_form.module.css";
export default function ErrorHandler(error: any) {
    console.log(error);
    if (Array.isArray(error) && error.map)
        return (
            <span className={form_globals.verticalListCrunch}>
                {error.map((errorChild, index) => (
                    <ErrorHandler
                        error={errorChild}
                        key={index}
                    />
                ))}
            </span>
        );
    else if (typeof error === "string")
        return (
            <span className={`${globals.text} ${form_globals.render_error}`}>
                <span className={form_globals.iconSmall}>error</span> Error:{" "}
                {error.replace(
                    /\["?(\d+)"?\]/g,
                    (_: string, s1: string, __: any, ___: string) =>
                        " field #" + (+s1 + 1)
                )}
            </span>
        );
    else if (Array.isArray(error.error) && error.error.map)
        return (
            <span className={form_globals.verticalListCrunch}>
                {error.error.map((errorChild: string, index: number) => (
                    <ErrorHandler
                        error={errorChild}
                        key={index}
                    />
                ))}
            </span>
        );
    else if (typeof error.error === "string")
        return (
            <span className={`${globals.text} ${form_globals.render_error}`}>
                <span className={form_globals.iconSmall}>error</span> Error:{" "}
                {error.error.replace(
                    /\["?(\d+)"?\]/g,
                    (_: string, s1: string, __: any, ___: string) =>
                        " field #" + (+s1 + 1)
                )}
            </span>
        );
}
