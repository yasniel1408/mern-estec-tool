import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Table.scss";
import { urlGetProducto } from "../../util/rutasAPI";
import $ from "jquery";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Almacen = (props) => {
  useEffect(() => {
    $(document).ready(function () {
      $("#table-almacen tfoot th").each(function (index) {
        var title = $(this).text();
        $(this).html('<input type="search" placeholder="Filtrar.." />');
      });

      var table = $("#table-almacen").DataTable({
        bProcessing: true,
        ajax: {
          method: "GET",
          url: urlGetProducto,
          data: { operacion: "datos" },
          headers: {
            Authorization: localStorage.getItem("auth-token"),
          },
        },
        columns: [
          {
            data: "",
            searchable: false,
            render: function (value, date) {
              return date;
            },
          },
          {
            data: "Id_Producto",
            type: "string",
            visible: true,
            searchable: true,
          },
          {
            data: "Desc_Producto",
            type: "string",
            visible: true,
            searchable: true,
          },
          {
            data: "Fecha_Entrada",
            type: "date",
            visible: true,
            searchable: true,
            render: function (value) {
              if (value === null) return "";
              var dt = new Date(value);
              if (dt.getFullYear() === 9999) return ""; //Control para MaxValue
              return (
                dt.getDate() +
                "/" +
                (dt.getMonth() + 1) +
                "/" +
                dt.getFullYear()
              );
            },
          },
        ],
        columnDefs: [
          {
            targets: 0,
            data: null,
            searchable: false,
            defaultContent: "",
            createdCell: function (td, cellData, rowData, row, col) {
              if (cellData < 1) $(td).addClass("details-control");
            },
          },
        ],
        dom: "BRlfrtipRT",
        pageLength: 10,
        order: [[1, "asc"]],
        processing: true,
        serverSide: true,
        destroy: true,
        buttons: [
          {
            extend: "collection",
            text: " Exportar",
            buttons: ["copy", "excel", "csv", "pdf", "print"],
          },
        ],
        language: {
          sProcessing: "",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "No se encontraron resultados",
          sEmptyTable: "Ningún dato disponible en esta tabla",
          sInfo:
            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
          sInfoEmpty:
            "Mostrando registros del 0 al 0 de un total de 0 registros",
          sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          searchPlaceholder: "Filtro Universal...",
          sUrl: "",
          sInfoThousands: ",",
          sLoadingRecords:
            "<div class='loaderTable' style='display: block;width:50px;height:50px;margin:0 auto;'></div>",
          oPaginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior",
          },
          oAria: {
            sSortAscending:
              ": Activar para ordenar la columna de manera ascendente",
            sSortDescending:
              ": Activar para ordenar la columna de manera descendente",
          },
        },
        initComplete: function () {
          this.api()
            .columns()
            .every(function () {
              var that = this;
              $("input", this.footer()).on("keyup change", function () {
                if (that.search() !== this.value) {
                  that.search(this.value).draw();
                }
              });
            });
        },
      });

      $("#table-almacen tbody").on("click", "td.details-control", function (e) {
        var tr = $(this).closest("tr");
        var row = table.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass("shown");
        } else {
          console.log(e.target);
          row
            .child(
              '<table id="table-almacen" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                "HOLAAAAA" +
                "</table>"
            )
            .show();
          tr.addClass("shown");
        }
      });
    });
  }, []);

  return (
    <>
      <Breadcrumb text="Productos en existencia" />
      <div className="contentArea">
        <table id="table-almacen">
          <thead>
            <tr>
              <th className="details-control sorting_disabled" disabled></th>
              <th>Id Producto</th>
              <th>Nomber del Producto</th>
              <th>Fecha de Entrada</th>
            </tr>
          </thead>

          <tfoot>
            <tr>
              <th className="details-control sorting_disabled" disabled></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Almacen;
