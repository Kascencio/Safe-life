import Image from "next/image";
import { redirect } from 'next/navigation';
import Login from "./login/page";
import Registros from "./register/page"

export default function Home() {
  redirect('/Registros');
}
