import NavigationHeader from "@/app/(root)/_components/Header";
import EditorPanel from "@/app/(root)/_components/EditorPanel";
import InputPanel from "@/app/(root)/_components/InputPanel";
import OutputPanel from "@/app/(root)/_components/OutputPanel";

export default function Home() {
  return (
    <div className="h-[90vh]">
      <div className="mx-auto">
        <NavigationHeader />
        <div className="h-[80vh] grid grid-cols-1 lg:grid-cols-2 gap-2 m-2">
          <EditorPanel />
          <div className="grid grid-cols-1 lg:grid-rows-2 gap-2">
            <InputPanel />
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
